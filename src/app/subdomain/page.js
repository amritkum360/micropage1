'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function SubdomainContent() {
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subdomainName = searchParams.get('name');
    if (subdomainName) {
      setName(subdomainName);
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}>
        <div style={{ 
          color: "white", 
          fontSize: "2rem",
          textAlign: "center"
        }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ 
        textAlign: "center",
        color: "white"
      }}>
        <h1 style={{ 
          fontSize: "4rem", 
          margin: "0",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          fontWeight: "bold"
        }}>
          {name}
        </h1>
        <p style={{ 
          fontSize: "1.2rem", 
          marginTop: "1rem",
          opacity: 0.8
        }}>
          Welcome to {name} page!
        </p>
        <div style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "10px",
          backdropFilter: "blur(10px)"
        }}>
          <p style={{ margin: "0", fontSize: "0.9rem" }}>
            Subdomain: {name}.jirocash.com
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }}>
      <div style={{ 
        color: "white", 
        fontSize: "2rem",
        textAlign: "center"
      }}>
        Loading...
      </div>
    </div>
  );
}

export default function SubdomainPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SubdomainContent />
    </Suspense>
  );
}
