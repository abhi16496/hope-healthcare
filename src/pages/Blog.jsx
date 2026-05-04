import React from 'react';
import { blogPosts } from '../data/blogPosts';
import { Clock, ArrowRight, Tag } from 'lucide-react';

const Blog = () => {
  return (
    <div className="page-wrapper">
      <div className="page-hero-sm">
        <div className="container"><h1>Health Tips & Blog</h1><p>Latest health articles and wellness advice</p></div>
      </div>
      <section className="section bg-light">
        <div className="container">
          <div className="grid-3">
            {blogPosts.map((post) => (
              <div key={post.id} className="card" style={{ overflow: 'hidden' }}>
                <div style={{ height: '160px', background: 'linear-gradient(135deg, var(--primary-light), var(--secondary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                  <h3 style={{ textAlign: 'center', fontSize: '1rem', color: 'var(--primary)' }}>{post.title}</h3>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', fontSize: '0.8rem', color: 'var(--gray-400)' }}>
                    <span><Tag size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> {post.category}</span>
                    <span><Clock size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> {post.readTime}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: '16px' }}>{post.excerpt}</p>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>Read More →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
