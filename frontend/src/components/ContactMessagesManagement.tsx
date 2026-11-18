
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Inbox,
  Mail,
  Phone,
  RefreshCw,
  User,
} from "lucide-react";

import {
  getContactMessages,
  updateContactMessageStatus,
  type ContactMessage,
  type ContactMessageStatus,
} from "../services/contactApi";

interface ContactMessagesManagementProps {
  accessToken: string;
}

type StatusFilter = "all" | ContactMessageStatus;

const statusLabels: Record<ContactMessageStatus, string> = {
  new: "New",
  in_progress: "In Progress",
  handled: "Handled",
};

function formatDate(date: string): string {
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: ContactMessageStatus }) {
  const styles: Record<ContactMessageStatus, string> = {
    new: "bg-blue-50 text-blue-700 ring-blue-200",
    in_progress: "bg-amber-50 text-amber-700 ring-amber-200",
    handled: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

export default function ContactMessagesManagement({
  accessToken,
}: ContactMessagesManagementProps) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [filter, setFilter] = useState<StatusFilter>("all");
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [totalMessages, setTotalMessages] = useState(0);

  const [statistics, setStatistics] = useState({
    new: 0,
    in_progress: 0,
    handled: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const selectedMessage = useMemo(
    () => messages.find((message) => message.id === selectedId) || null,
    [messages, selectedId]
  );

  const loadMessages = useCallback(
    async (showRefreshIndicator = false) => {
      if (showRefreshIndicator) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      setErrorMessage(null);

      try {
        const result = await getContactMessages(
          accessToken,
          page,
          10,
          filter === "all" ? undefined : filter
        );

        setMessages(result.messages);
        setTotalMessages(result.pagination.total);
        setTotalPages(Math.max(1, result.pagination.totalPages));
        setStatistics(result.statistics);

        setSelectedId((currentId) => {
          if (
            currentId &&
            result.messages.some((message) => message.id === currentId)
          ) {
            return currentId;
          }

          return result.messages[0]?.id ?? null;
        });
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load contact messages."
        );
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [accessToken, page, filter]
  );

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const handleFilterChange = (nextFilter: StatusFilter) => {
    setFilter(nextFilter);
    setPage(1);
    setActionMessage(null);
  };

  const handleStatusUpdate = async (
    message: ContactMessage,
    nextStatus: ContactMessageStatus
  ) => {
    if (message.status === nextStatus) return;

    setUpdatingId(message.id);
    setActionMessage(null);
    setErrorMessage(null);

    try {
      await updateContactMessageStatus(
        accessToken,
        message.id,
        nextStatus
      );

      setActionMessage(
        `Message marked as ${statusLabels[nextStatus].toLowerCase()}.`
      );

      await loadMessages(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to update this message."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const filterOptions: { label: string; value: StatusFilter }[] = [
    { label: "All messages", value: "all" },
    { label: "New", value: "new" },
    { label: "In Progress", value: "in_progress" },
    { label: "Handled", value: "handled" },
  ];

  return (
    <section className="space-y-6">
      {/* Page introduction */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Contact Messages
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Read and manage messages submitted through the school website.
          </p>
        </div>

        <button
          type="button"
          onClick={() => loadMessages(true)}
          disabled={isRefreshing || isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={isRefreshing ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              New messages
            </p>
            <Mail className="text-blue-600" size={20} />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">
            {statistics.new}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              In progress
            </p>
            <Clock3 className="text-amber-600" size={20} />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">
            {statistics.in_progress}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Handled
            </p>
            <CheckCircle2 className="text-emerald-600" size={20} />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">
            {statistics.handled}
          </p>
        </div>
      </div>

      {/* Feedback messages */}
      {errorMessage && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <p>{errorMessage}</p>
        </div>
      )}

      {actionMessage && (
        <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          <CheckCircle2 size={18} />
          <p>{actionMessage}</p>
        </div>
      )}

      {/* Main inbox */}
      <div className="grid min-h-[520px] grid-cols-1 gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        {/* Message list */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-4">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Inbox
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {totalMessages} message{totalMessages === 1 ? "" : "s"}
                </p>
              </div>

              <select
                value={filter}
                onChange={(event) =>
                  handleFilterChange(event.target.value as StatusFilter)
                }
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                aria-label="Filter messages by status"
              >
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex min-h-72 items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <RefreshCw size={18} className="animate-spin" />
                Loading messages...
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
              <Inbox size={36} className="text-slate-300" />
              <h4 className="mt-4 font-semibold text-slate-800">
                No messages found
              </h4>
              <p className="mt-1 max-w-xs text-sm text-slate-500">
                There are no messages in this category yet.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {messages.map((message) => {
                const isSelected = selectedId === message.id;

                return (
                  <button
                    type="button"
                    key={message.id}
                    onClick={() => setSelectedId(message.id)}
                    className={`w-full border-l-4 p-4 text-left transition hover:bg-slate-50 ${
                      isSelected
                        ? "border-teal-600 bg-teal-50/50"
                        : "border-transparent"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {message.name}
                        </p>
                        <p className="mt-1 truncate text-sm text-slate-600">
                          {message.subject}
                        </p>
                      </div>

                      <StatusBadge status={message.status} />
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                      {message.message}
                    </p>

                    <p className="mt-3 text-xs text-slate-400">
                      {formatDate(message.created_at)}
                    </p>
                  </button>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && totalMessages > 0 && (
            <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
              <p className="text-xs text-slate-500">
                Page {page} of {totalPages}
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page <= 1}
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setPage((current) => Math.min(totalPages, current + 1))
                  }
                  disabled={page >= totalPages}
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Selected message details */}
        <div className="rounded-xl border border-slate-200 bg-white">
          {!selectedMessage ? (
            <div className="flex min-h-[520px] flex-col items-center justify-center px-6 text-center">
              <Mail size={38} className="text-slate-300" />
              <h3 className="mt-4 font-semibold text-slate-800">
                Select a message
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Choose a message from the inbox to read its details.
              </p>
            </div>
          ) : (
            <div className="space-y-6 p-5 sm:p-6">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Message details
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-slate-900">
                    {selectedMessage.subject}
                  </h3>
                </div>

                <StatusBadge status={selectedMessage.status} />
              </div>

              <div className="space-y-4 border-y border-slate-100 py-5">
                <div className="flex items-start gap-3">
                  <User size={18} className="mt-0.5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Sender</p>
                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {selectedMessage.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 text-slate-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">Email address</p>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="mt-1 block break-all text-sm font-medium text-teal-700 hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>

                {selectedMessage.phone && (
                  <div className="flex items-start gap-3">
                    <Phone size={18} className="mt-0.5 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-400">Phone number</p>
                      <a
                        href={`tel:${selectedMessage.phone}`}
                        className="mt-1 block text-sm font-medium text-teal-700 hover:underline"
                      >
                        {selectedMessage.phone}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <CalendarDays
                    size={18}
                    className="mt-0.5 text-slate-400"
                  />
                  <div>
                    <p className="text-xs text-slate-400">Received</p>
                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {formatDate(selectedMessage.created_at)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-800">
                  Message
                </h4>
                <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600">
                  {selectedMessage.message}
                </p>
              </div>

              {selectedMessage.status === "handled" &&
                selectedMessage.handled_at && (
                  <div className="rounded-lg bg-emerald-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                      <CheckCircle2 size={17} />
                      This message has been handled
                    </div>
                    <p className="mt-2 text-xs text-emerald-700">
                      Handled on {formatDate(selectedMessage.handled_at)}
                    </p>
                  </div>
                )}

              <div className="border-t border-slate-100 pt-5">
                <label
                  htmlFor="message-status"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Update message status
                </label>

                <select
                  id="message-status"
                  value={selectedMessage.status}
                  disabled={updatingId === selectedMessage.id}
                  onChange={(event) =>
                    handleStatusUpdate(
                      selectedMessage,
                      event.target.value as ContactMessageStatus
                    )
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:opacity-60"
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="handled">Handled</option>
                </select>

                {updatingId === selectedMessage.id && (
                  <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <RefreshCw size={13} className="animate-spin" />
                    Updating message...
                  </p>
                )}

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Changing the status to Handled automatically records the
                  administrator and the date it was handled.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
