import { createClient } from '@supabase/supabase-js'
import { createServerFn } from '@tanstack/react-start'

// Use fallbacks to prevent crash if env vars are missing
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'placeholder'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const getTestimonialsFn = createServerFn('GET', async () => {
  if (supabaseUrl.includes('placeholder')) return []
  const { data, error } = await supabase.from('testimonials').select('*')
  if (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
  return data
})

export const getFaqsFn = createServerFn('GET', async () => {
  if (supabaseUrl.includes('placeholder')) return []
  const { data, error } = await supabase.from('faqs').select('*')
  if (error) {
    console.error('Error fetching faqs:', error)
    return []
  }
  return data
})

export const getBlogPostsFn = createServerFn('GET', async () => {
  if (supabaseUrl.includes('placeholder')) return []
  const { data, error } = await supabase.from('blog_posts').select('*')
  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
  return data
})
