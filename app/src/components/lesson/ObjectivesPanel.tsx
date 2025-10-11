'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ObjectivesPanelProps {
  objectives: string[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function ObjectivesPanel({ objectives }: ObjectivesPanelProps) {
  return (
    <Card
      data-testid="objectives-panel"
      className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent"
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Target className="size-4" />
          </div>
          Ne Öğreneceksiniz
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-3"
          role="list"
          aria-label="Öğrenme hedefleri"
        >
          {objectives.map((objective, index) => (
            <motion.li
              key={index}
              variants={item}
              className="flex items-start gap-3 text-sm text-foreground"
            >
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
              <span className="flex-1">{objective}</span>
            </motion.li>
          ))}
        </motion.ul>
      </CardContent>
    </Card>
  );
}
