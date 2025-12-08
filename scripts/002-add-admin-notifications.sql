-- Add admin notifications table for storing email notifications
CREATE TABLE IF NOT EXISTS admin_notifications (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'new_order',
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_notifications_read ON admin_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON admin_notifications(created_at DESC);
