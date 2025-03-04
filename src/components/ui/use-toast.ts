
// Simplified toast hook for the prototype
export function useToast() {
  const toast = ({ title, description, variant }: { title: string; description: string; variant?: "default" | "destructive" }) => {
    console.log(`Toast: ${title} - ${description} (${variant || "default"})`);
    // In a real implementation, this would show a toast notification
    alert(`${title}: ${description}`);
  };

  return { toast };
}
