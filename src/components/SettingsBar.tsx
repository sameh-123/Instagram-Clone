'use client';
import { Switch } from '@/components/ui/switch';

export default function SettingsBar() {
  return (
    <div className="container mx-auto py-9 flex items-center justify-end gap-2">
      <div>Dark Mode</div>
      <Switch
        onCheckedChange={(checked) => {
          if (checked) document.documentElement?.classList.add('dark');
          else document.documentElement?.classList.remove('dark');
        }}
      />
    </div>
  );
}
