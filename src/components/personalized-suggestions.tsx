'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { personalizedProductSuggestions } from '@/ai/flows/personalized-product-suggestions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export default function PersonalizedSuggestions() {
  const { user, loading } = useAuth();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    if (user && user.role === 'Cliente' && user.heightCm && user.gender) {
      const getSuggestions = async () => {
        setIsAiLoading(true);
        try {
          const result = await personalizedProductSuggestions({
            heightCm: user.heightCm!,
            gender: user.gender!,
          });
          setSuggestions(result.suggestions);
        } catch (error) {
          console.error('Error fetching personalized suggestions:', error);
        } finally {
          setIsAiLoading(false);
        }
      };
      getSuggestions();
    }
  }, [user]);

  if (loading || (!user && !loading) || user?.role !== 'Cliente' || (!user.heightCm || !user.gender)) {
    return null;
  }

  return (
    <div className="mb-12">
      <Card className="bg-secondary/50 border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-3">
            <Wand2 className="text-primary" />
            <span>Recomendado para Ti</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isAiLoading ? (
            <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          ) : (
            <p>No hemos podido generar sugerencias en este momento.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
