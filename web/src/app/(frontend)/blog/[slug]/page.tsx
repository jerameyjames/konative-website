"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import NewsletterSignup from "@/components/NewsletterSignup";

interface GhostPost {
  title: string;
  html: string;
  feature_image: string | null;
  published_at: string;
  reading_time: number;
  primary_author?: { name: string };
  tags?: { name: string }[];
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<GhostPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      const ghostUrl = process.env.NEXT_PUBLIC_GHOST_URL;
      const ghostKey = process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY;

      if (!ghostUrl || !ghostKey || !slug) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${ghostUrl}/ghost/api/content/posts/slug/${slug}/?key=${ghostKey}&include=authors,tags`,
        );
        const data = await res.json();
        if (data.posts?.[0]) {
          setPost(data.posts[0]);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      }
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <section className="blog-post">
        <div className="blog-post__inner">
          <p className="blog-post__loading">Loading...</p>
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="blog-post">
        <div className="blog-post__inner">
          <div className="blog-post__not-found">
            <h1>Post Not Found</h1>
            <p>This post could not be loaded. Ghost CMS may not be configured.</p>
            <NewsletterSignup variant="inline" source="blog-post" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-post">
      <div className="blog-post__inner">
        <header className="blog-post__header">
          <h1>{post.title}</h1>
          <div className="blog-post__meta">
            {post.primary_author && (
              <span className="blog-post__author">
                {post.primary_author.name}
              </span>
            )}
            <time>
              {new Date(post.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.reading_time && (
              <span>{post.reading_time} min read</span>
            )}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="blog-post__tags">
              {post.tags.map((tag) => (
                <span key={tag.name} className="blog-post__tag">
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {post.feature_image && (
          <img
            src={post.feature_image}
            alt={post.title}
            className="blog-post__feature-image"
          />
        )}

        <div
          className="blog-post__content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div className="blog-post__cta">
          <NewsletterSignup variant="banner" source="blog-post" />
        </div>
      </div>
    </section>
  );
}
