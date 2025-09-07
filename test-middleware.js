// Simple test to check middleware logic
const host = "dramrit.localhost:3000";
console.log('Host:', host);

const parts = host.split(".");
console.log('Parts:', parts);
console.log('Parts length:', parts.length);

const isLocalhost = host.includes('localhost');
console.log('Is localhost:', isLocalhost);

let subdomain = parts[0];
console.log('Initial subdomain:', subdomain);

// Test the logic
if (subdomain === "www" || subdomain === "jirocash" || (isLocalhost && parts.length === 1)) {
  console.log('❌ Root domain detected - should show main site');
} else if (isLocalhost && parts.length >= 2) {
  subdomain = parts[0];
  console.log('✅ Localhost subdomain detected:', subdomain);
} else {
  console.log('❌ No subdomain detected');
}

console.log('Final subdomain:', subdomain);
