
import type { ApiNotice } from '../services/noticesApi';
import type { Notice } from '../data/notices';
import { noticeCategories } from '../data/notices';

function getCategory(title: string): Notice['category'] {
  const text = title.toLowerCase();

  if (text.includes('admission') || text.includes('enrol')) {
    return 'ADMISSIONS';
  }

  if (text.includes('alumni') || text.includes('reunion')) {
    return 'ALUMNI';
  }

  if (
    text.includes('sport') ||
    text.includes('football') ||
    text.includes('competition')
  ) {
    return 'SPORTS';
  }

  if (
    text.includes('event') ||
    text.includes('fair') ||
    text.includes('celebration')
  ) {
    return 'EVENT';
  }

  if (
    text.includes('exam') ||
    text.includes('academic') ||
    text.includes('term') ||
    text.includes('timetable')
  ) {
    return 'ACADEMIC';
  }

  return 'OFFICIAL';
}

export function adaptNotice(apiNotice: ApiNotice): Notice {
  const category = getCategory(apiNotice.title);
  const categoryInfo = noticeCategories.find(
    (item) => item.value === category
  );

  return {
    id: apiNotice.slug,
    category,
    categoryLabel: categoryInfo?.label ?? 'Official Notice',
    categoryColor: categoryInfo?.color ?? 'bg-school-navy',
    date: new Intl.DateTimeFormat('en', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(apiNotice.published_at)),
    title: apiNotice.title,
    summary: apiNotice.summary,
    content: apiNotice.body,
    placeholder: false,
  };
}
