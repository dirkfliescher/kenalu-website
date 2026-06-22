'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import InsightCard from './InsightCard';

export default function InsightsFilter({ articles, authors = {} }) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [activeTag, setActiveTag] = useState('all');
  const [activeYear, setActiveYear] = useState('all');
  const [activeAuthor, setActiveAuthor] = useState('all');
  const debounceRef = useRef(null);

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

  const filtered = useMemo(() => {
    return articles.filter((article) => {
      const tagMatch = activeTag === 'all' || article.content?.insight_tag === activeTag;
      const yearMatch =
        activeYear === 'all' ||
        (article.content?.insight_date &&
          new Date(article.content.insight_date).getFullYear() === Number(activeYear));
      const authorMatch =
        activeAuthor === 'all' || article.content?.insight_author === activeAuthor;
      return tagMatch && yearMatch && authorMatch;
    });
  }, [articles, activeTag, activeYear, activeAuthor]);

  const showFilters =
    !query &&
    articles.length > 3 &&
    (tags.length > 1 || years.length > 1 || authorEntries.length > 1);

  // Suche mit Debounce (400ms)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      setSearchResults(null);
      setSearching(false);
      return;
    }

    setSearching(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: query.trim() }),
        });
        const data = await res.json();
        setSearchResults(data.articles || []);
      } catch {
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const displayArticles = query.trim().length >= 2 ? (searchResults || []) : filtered;
  const isSearchMode = query.trim().length >= 2;

  return (
    <>
      {/* Suchleiste */}
      <div className="insights-search">
        <div className="insights-search-inner">
          <span className="insights-search-icon">⌕</span>
          <input
            type="text"
            className="insights-search-input"
            placeholder="Thema, Frage oder Stichwort suchen…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className="insights-search-clear"
              onClick={() => setQuery('')}
              aria-label="Suche löschen"
            >
              ×
            </button>
          )}
        </div>
        {searching && <p className="insights-search-status">Suche läuft…</p>}
        {isSearchMode && !searching && searchResults !== null && (
          <p className="insights-search-status">
            {searchResults.length > 0
              ? `${searchResults.length} Treffer für «${query}»`
              : `Keine Treffer für «${query}»`}
          </p>
        )}
      </div>

      {/* Filter – nur wenn nicht im Suchmodus */}
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
                  className={`insights-filter-pill ${
                    activeAuthor === author.uuid ? 'active' : ''
                  }`}
                  onClick={() => setActiveAuthor(author.uuid)}
                >
                  {author.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Ergebnisse */}
      {searching ? (
        <div className="insights-search-loading">
          <div className="insights-search-spinner" />
          <p>Artikel werden durchsucht…</p>
        </div>
      ) : displayArticles.length > 0 ? (
        <div className="insights-grid">
          {displayArticles.map((article) => (
            <InsightCard key={article.uuid} article={article} />
          ))}
        </div>
      ) : (
        <p className="insights-empty">
          {isSearchMode
            ? 'Kein Artikel passt zu dieser Suche. Versuch ein anderes Stichwort.'
            : 'Keine Artikel für diese Auswahl.'}
        </p>
      )}
    </>
  );
}
