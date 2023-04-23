import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jqzaltlumunzpfzypjfs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxemFsdGx1bXVuenBmenlwamZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA1Nzg2NDYsImV4cCI6MTk5NjE1NDY0Nn0.fQczQp5IF-NJPrSBnsglB458gOOesmg3rKA6Q1gLeU4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)