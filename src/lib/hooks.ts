import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import type { Notice, EventItem, Club, Contact, CampusLocation } from './types';

function useFetch<T>(
  table: string,
  orderCol: string,
  ascending: boolean = true,
  extra?: { column: string; value: unknown }
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let query = supabase.from(table).select('*').order(orderCol, { ascending });
    if (extra) query = query.eq(extra.column, extra.value);
    query.then(({ data, error }) => {
      if (error) setError(error.message);
      else setData((data ?? []) as T[]);
      setLoading(false);
    });
  }, [table, orderCol, ascending, extra?.column, extra?.value]);

  return { data, loading, error };
}

export function useNotices() {
  return useFetch<Notice>('notices', 'posted_at', false);
}

export function useEvents() {
  return useFetch<EventItem>('events', 'event_date', true);
}

export function useClubs() {
  return useFetch<Club>('clubs', 'name', true);
}

export function useContacts() {
  return useFetch<Contact>('contacts', 'priority', false);
}

export function useCampusLocations() {
  return useFetch<CampusLocation>('campus_locations', 'block', true);
}
