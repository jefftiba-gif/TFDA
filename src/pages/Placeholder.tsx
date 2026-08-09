import { Construction } from "lucide-react";
import { PageHeader, Card } from "../components/ui";

export default function Placeholder({ title, note }: { title: string; note?: string }) {
  return (
    <div>
      <PageHeader title={title} />
      <Card className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <Construction className="text-slate-300" size={40} />
        <div className="font-medium text-slate-500">此頁面規劃中</div>
        <p className="max-w-md text-sm text-slate-400">
          {note ?? "此功能區塊已列入提案書之核心功能清單，將於需求訪談與現況盤點完成後進一步設計實作。"}
        </p>
      </Card>
    </div>
  );
}
