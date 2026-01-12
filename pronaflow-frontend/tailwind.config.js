// tailwind.config.js (Mô tả logic)
module.exports = {
  theme: {
    extend: {
      colors: {
        // Ánh xạ từ tài liệu task-priorities.json & status
        priority: {
          urgent: 'var(--color-urgent)', // #EF4444
          high: 'var(--color-high)',     // #F97316
          medium: 'var(--color-medium)', // #3B82F6
          low: 'var(--color-low)',       // #6B7280
        },
        state: {
          todo: 'var(--color-todo)',
          inprogress: 'var(--color-inprogress)',
          done: 'var(--color-done)',
        }
      },
      spacing: {
        // Hỗ trợ chế độ Compact (Nhiệm vụ 1)
        'compact': '0.5rem',
        'comfortable': '1rem',
      }
    }
  }
}