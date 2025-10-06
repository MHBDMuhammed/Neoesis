'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

export interface ComparisonColumn {
  /**
   * Column header text
   */
  header: string;
  /**
   * Row data for this column
   */
  rows: (string | boolean | React.ReactNode)[];
}

export interface ComparisonTableProps {
  /**
   * Title for the comparison table
   */
  title?: string;
  /**
   * Column data
   */
  columns: ComparisonColumn[];
  /**
   * Row labels (optional)
   */
  rowLabels?: string[];
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Comparison table for side-by-side comparisons
 *
 * @example
 * ```tsx
 * <ComparisonTable
 *   title="Class vs Function Components"
 *   rowLabels={['Syntax', 'State', 'Lifecycle', 'Performance']}
 *   columns={[
 *     {
 *       header: 'Class Components',
 *       rows: [
 *         'Uses class syntax',
 *         'this.state',
 *         'Lifecycle methods',
 *         'Slightly slower'
 *       ]
 *     },
 *     {
 *       header: 'Function Components',
 *       rows: [
 *         'Uses function syntax',
 *         'useState hook',
 *         'useEffect hook',
 *         'Faster'
 *       ]
 *     }
 *   ]}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <ComparisonTable
 *   title="Feature Support"
 *   columns={[
 *     {
 *       header: 'React 17',
 *       rows: [true, false, true, false]
 *     },
 *     {
 *       header: 'React 18',
 *       rows: [true, true, true, true]
 *     }
 *   ]}
 * />
 * ```
 */
export function ComparisonTable({
  title,
  columns,
  rowLabels,
  className,
}: ComparisonTableProps) {
  // Determine number of rows from first column
  const numRows = columns[0]?.rows.length ?? 0;

  const renderCell = (value: string | boolean | React.ReactNode) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="mx-auto size-5 text-green-500" aria-label="Yes" />
      ) : (
        <X className="mx-auto size-5 text-red-500" aria-label="No" />
      );
    }
    return value;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn('not-prose my-8', className)}
    >
      {title && (
        <h3 className="mb-4 text-xl font-semibold text-foreground">{title}</h3>
      )}

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted">
              {rowLabels && (
                <th className="p-4 text-start text-sm font-semibold text-foreground">
                  {/* Empty cell for row labels column */}
                </th>
              )}
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="p-4 text-center text-sm font-semibold text-foreground"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numRows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b last:border-0">
                {rowLabels && (
                  <td className="p-4 text-sm font-medium text-muted-foreground">
                    {rowLabels[rowIndex]}
                  </td>
                )}
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="p-4 text-center text-sm text-foreground"
                  >
                    {renderCell(column.rows[rowIndex])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
