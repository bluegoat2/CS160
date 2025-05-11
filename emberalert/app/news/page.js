'use client';

import { useState, useEffect } from 'react';

export default function NewsPage() {
    const [allArticles, setAllArticles] = useState([]); // Stores all loaded articles
    const [displayedArticles, setDisplayedArticles] = useState([]); // Stores currently displayed articles
    const [loading, setLoading] = useState(false);
    const [lastTimestamp, setLastTimestamp] = useState(new Date().toISOString());
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const articlesPerPage = 9;
    const apiKey = process.env.NEXT_PUBLIC_GNEWS_API_KEY;

    const loadArticles = async (loadMore = false) => {
    if (loading || (!loadMore && allArticles.length > 0)) return;
    
    setLoading(true);
    try {
        let url = `https://gnews.io/api/v4/search?q=wildfire&lang=en&token=${apiKey}`;
        
        if (loadMore) {
            url += `&to=${lastTimestamp}`;
        }

        const res = await fetch(url, { cache: 'no-store' });
        const data = await res.json();
        
        if (data.articles && data.articles.length > 0) {
            // Filter out any articles we already have
            const newArticles = data.articles.filter(
            newArticle => !allArticles.some(
                existingArticle => existingArticle.url === newArticle.url
            )
            );

        if (newArticles.length > 0) {
            setAllArticles(prev => [...prev, ...newArticles]);
            // Update timestamp to the oldest article's publish date
            setLastTimestamp(newArticles[newArticles.length - 1].publishedAt);
            
            // Update displayed articles
            const endIndex = page * articlesPerPage;
            const updatedArticles = [...allArticles, ...newArticles];
            setAllArticles(updatedArticles);
            setDisplayedArticles(updatedArticles.slice(0, page * articlesPerPage));
        } else {
            // No new articles means we've likely reached the end
            setHasMore(false);
        }
      } else {
            setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load initial articles
  useEffect(() => {
    loadArticles();
  }, []);

  // Update displayed articles when allArticles or page changes
  useEffect(() => {
    const endIndex = page * articlesPerPage;
    setDisplayedArticles(allArticles.slice(0, endIndex));
    setHasMore(endIndex < allArticles.length);
  }, [page, allArticles]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const endIndex = nextPage * articlesPerPage;
    
    // If we don't have enough articles, fetch more
    if (endIndex > allArticles.length) {
      loadArticles(true).then(() => {
        setPage(nextPage);
      });
    } else {
      setPage(nextPage);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Daily Wildfire News</h1>
      {displayedArticles.length === 0 && !loading ? (
        <p>No wildfire news found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedArticles.map((article, idx) => (
              <div 
                key={`${article.url}-${idx}`} 
                className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
              >
                {article.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'; // Hide broken images
                      }}
                    />
                  </div>
                )}
                <div className="p-4 flex-grow">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    <h2 className="text-xl font-semibold mb-2 line-clamp-2">{article.title}</h2>
                  </a>
                  <p className="text-gray-600 text-sm mb-3">
                    {new Date(article.publishedAt).toLocaleDateString()} - {article.source.name}
                  </p>
                  <p className="text-gray-700 line-clamp-3">{article.description}</p>
                </div>
                <div className="p-4 border-t">
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Read more
                  </a>
                </div>
              </div>
            ))}
          </div>
          {(hasMore || allArticles.length > displayedArticles.length) && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition"
              >
                {loading ? 'Loading...' : 'Load More Articles'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}