'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function TestContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  return (
    <div style={{ 
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "800px",
      margin: "0 auto"
    }}>
      <h1>🧪 Subdomain Test Page</h1>
      
      <div style={{
        background: "#f0f0f0",
        padding: "20px",
        borderRadius: "8px",
        margin: "20px 0"
      }}>
        <h2>Debug Information:</h2>
        <p><strong>Subdomain Name:</strong> {name || "Not found"}</p>
        <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : "Server side"}</p>
        <p><strong>Host:</strong> {typeof window !== 'undefined' ? window.location.host : "Server side"}</p>
      </div>

      {name ? (
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "30px",
          borderRadius: "10px",
          textAlign: "center"
        }}>
          <h1 style={{ fontSize: "3rem", margin: "0" }}>{name}</h1>
          <p>Welcome to {name}s subdomain!</p>
        </div>
      ) : (
        <div style={{
          background: "#ffebee",
          color: "#c62828",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center"
        }}>
          <h2>❌ No subdomain detected</h2>
          <p>Make sure you are accessing via a subdomain like:</p>
          <ul style={{ textAlign: "left", display: "inline-block" }}>
            <li>amrit.localhost:3000</li>
            <li>rahul.localhost:3000</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default function TestSubdomainPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TestContent />
    </Suspense>
  );
}
