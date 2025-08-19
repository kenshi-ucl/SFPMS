export function isStrongPassword(pw: string): boolean {
	return (
		pw.length >= 12 && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)
	)
}

// very simple in-memory token bucket per key
const buckets = new Map<string, { tokens: number; last: number }>()

export function allowRequest(key: string, ratePerMinute = 60): boolean {
	const now = Date.now()
	const capacity = ratePerMinute
	const refillPerMs = ratePerMinute / 60000
	let bucket = buckets.get(key)
	if (!bucket) {
		bucket = { tokens: capacity, last: now }
		buckets.set(key, bucket)
	}
	const elapsed = now - bucket.last
	bucket.tokens = Math.min(capacity, bucket.tokens + elapsed * refillPerMs)
	bucket.last = now
	if (bucket.tokens < 1) return false
	bucket.tokens -= 1
	return true
} 