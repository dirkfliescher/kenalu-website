'use client';

import { useMemo, useState } from 'react';
import InsightCard from './InsightCard';

export default function InsightsFilter({ articles, authors = {} }) {
  const tags = useMemo(() => {
    const set = new Set();
    articles.forEach((article) => {
      if (article.content?.insight_tag) set.add(article.content.insight_tag);
    });
    return Array.from(set).sort();
  }, [articles]);

  const years = useMemo(() => {
    const set = new Set();
    articles.forEach((article) => {
      const date = article.content?.insight_date;
      if (date) {
        const year = new Date(date).getFullYear();
        if (!Number.isNaN(year)) set.add(year);
      }
    });
    return Array.from(set).sort((a, b) => b - a);
  }, [articles]);

  const authorEntries = useMemo(() => {
    const set = new Set();
    articles.forEach((article) => {
      const uuid = article.content?.insight_author;
      if (typeof uuid === 'string' && uuid && authors[uuid]) set.add(uuid);
    });
    return Array.from(set)
      .map((uuid) => ({ uuid, name: authors[uuid] }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [articles, authors]);

  const [activeTag, setActiveTag] = useState('all');
  const [activeYear, setActiveYear] = useState('all');
  const [activeAuthor, setActiveAuthor] = useState('all');

  const filtered = useMemo(() => {
    return articles.filter((article) => {
      const tagMatch = activeTag === 'all' || article.content?.insight_tag === activeTag;
      const yearMatch =
        activeYear === 'all' ||
        (article.content?.insight_date &&
          new Date(article.content.insight_date).getFullYear() === Number(activeYear));
      const authorMatch = activeAuthor === 'all' || article.content?.insight_author === activeAuthor;
      return tagMatch && yearMatch && authorMatch;
    });
  }, [articles, activeTag, activeYear, activeAuthor]);

  const showFilters =
    articles.length > 3 && (tags.length > 1 || years.length > 1 || authorEntries.length > 1);

  return (
    <>
      {showFilters && (
        <div className="insights-filters">
          {tags.length > 1 && (
            <div className="insights-filter-group">
              <button
                type="button"
                className={`insights-filter-pill ${activeTag === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTag('all')}
              >
                Alle Themen
              </button>
              {tags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={`insights-filter-pill ${activeTag === tag ? 'active' : ''}`}
                  onClick={() => setActiveTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {years.length > 1 && (
            <div className="insights-filter-group">
              <button
                type="button"
                className={`insights-filter-pill ${activeYear === 'all' ? 'active' : ''}`}
                onClick={() => setActiveYear('all')}
              >
                Alle Jahre
              </button>
              {years.map((year) => (
                <button
                  type="button"
                  key={year}
                  className={`insights-filter-pill ${activeYear === String(year) ? 'active' : ''}`}
                  onClick={() => setActiveYear(String(year))}
                >
                  {year}
                </button>
              ))}
            </div>
          )}

          {authorEntries.length > 1 && (
            <div className="insights-filter-group">
              <button
                type="button"
                className={`insights-filter-pill ${activeAuthor === 'all' ? 'active' : ''}`}
                onClick={() => setActiveAuthor('all')}
              >
                Alle Autoren
              </button>
              {authorEntries.map((author) => (
                <button
                  type="button"
                  key={author.uuid}
                  className={`insights-filter-pill ${activeAuthor === author.uuid ? 'active' : ''}`}
                  onClick={() => setActiveAuthor(author.uuid)}
                >
                  {author.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="insights-grid">
          {filtered.map((article) => (
            <InsightCard key={article.uuid} article={article} />
          ))}
        </div>
      ) : (
        <p className="insights-empty">Keine Artikel für diese Auswahl.</p>
      )}
    </>
  );
}
