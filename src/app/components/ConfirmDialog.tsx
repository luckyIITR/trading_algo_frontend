'use client';
import React from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-8 w-full max-w-xs">
        <div className="font-bold text-lg mb-2 text-blue-700">{title}</div>
        <div className="text-gray-600 mb-4 text-sm">{description}</div>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-semibold"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition font-semibold"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
} 