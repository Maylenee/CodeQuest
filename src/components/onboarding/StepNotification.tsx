import { useOnboardingStore } from "../../lib/store";
import { Button } from "../ui/Button";
import { Mascot } from "../ui/Mascot";
import { Bell, BellOff } from "lucide-react";

export function StepNotification() {
  const { notificationPermission, setNotificationPermission, nextStep, prevStep } = useOnboardingStore();

  const handleAllow = async () => {
    if ("Notification" in window) {
      const result = await Notification.requestPermission();
      setNotificationPermission(result === "granted");
    } else {
      setNotificationPermission(false);
    }
  };

  return (
    <div className="text-center">
      <Mascot size="lg" expression="happy" className="mb-4" />
      <h2 className="text-xl font-bold mb-2">Dapatkan Pengingat Harian</h2>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        Kami akan kirim notifikasi buat ngingetin kamu belajar tiap hari
      </p>
      <div className="flex flex-col gap-3 mb-6">
        <Button fullWidth variant={notificationPermission === true ? "primary" : "secondary"} onClick={handleAllow} className="!py-4">
          <Bell className="w-5 h-5" /> Izinkan Notifikasi
        </Button>
        <Button fullWidth variant={notificationPermission === false ? "primary" : "ghost"} onClick={() => setNotificationPermission(false)} className="!py-4">
          <BellOff className="w-5 h-5" /> Nanti Aja
        </Button>
      </div>
      <div className="flex gap-3">
        <Button variant="secondary" onClick={prevStep}>KEMBALI</Button>
        <Button fullWidth disabled={notificationPermission === null} onClick={nextStep}>LANJUTKAN</Button>
      </div>
    </div>
  );
}
