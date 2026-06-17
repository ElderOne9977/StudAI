import React, { useState } from 'react';
import { HeartPulse, Info } from 'lucide-react';

interface OrganInfo {
  id: string;
  name: string;
  type: string; // Cơ học / Hóa học
  desc: string;
  enzymes?: string;
}

export const DigestionSim: React.FC = () => {
  const [selectedOrgan, setSelectedOrgan] = useState<string>('stomach');

  const organs: Record<string, OrganInfo> = {
    mouth: {
      id: 'mouth',
      name: 'Khoang Miệng (Mouth)',
      type: 'Cơ học & Hóa học',
      desc: 'Nhai nghiền thức ăn cơ học bằng răng. Đồng thời nước bọt có chứa enzyme Amylase phân giải tinh bột chín thành đường maltose.',
      enzymes: 'Amylase (trong nước bọt)'
    },
    esophagus: {
      id: 'esophagus',
      name: 'Thực Quản (Esophagus)',
      type: 'Vận chuyển cơ học',
      desc: 'Dẫn thức ăn từ họng xuống dạ dày nhờ hoạt động co bóp cơ học (nhu động thực quản).'
    },
    stomach: {
      id: 'stomach',
      name: 'Dạ Dày (Stomach)',
      type: 'Cơ học & Hóa học mạnh',
      desc: 'Co bóp nghiền nát, nhào trộn thức ăn với dịch vị. Dịch vị chứa axit HCl tiêu diệt vi khuẩn và enzyme Pepsin phân cắt chuỗi Protein.',
      enzymes: 'Pepsin, Axit clohiđric (HCl)'
    },
    small_intestine: {
      id: 'small_intestine',
      name: 'Ruột Non (Small Intestine)',
      type: 'Hóa học chủ yếu & Hấp thụ',
      desc: 'Là nơi diễn ra hoạt động tiêu hóa hóa học triệt để nhất nhờ dịch ruột, dịch tụy và dịch mật từ gan. Đồng thời hấp thụ 95% chất dinh dưỡng qua các lông ruột.',
      enzymes: 'Amylase, Lipase, Trypsin, Erepsin...'
    },
    large_intestine: {
      id: 'large_intestine',
      name: 'Ruột Già (Large Intestine)',
      type: 'Hấp thụ nước',
      desc: 'Hấp thụ nốt phần nước còn lại, lên men vi khuẩn chất xơ, cô đặc chất bã tạo phân để thải ra ngoài.'
    },
    liver: {
      id: 'liver',
      name: 'Gan & Túi Mật (Liver & Gallbladder)',
      type: 'Hỗ trợ tiết dịch mật',
      desc: 'Gan sản xuất ra dịch mật (chứa muối mật) dự trữ trong túi mật, sau đó bơm vào ruột non để nhũ tương hóa chất béo (lipids).'
    },
    pancreas: {
      id: 'pancreas',
      name: 'Tuyến Tụy (Pancreas)',
      type: 'Tiết dịch tụy',
      desc: 'Tiết ra dịch tụy đổ vào ruột non chứa các enzyme phân giải hoàn toàn cả 3 nhóm chất: Tinh bột, Đạm, Béo.'
    }
  };

  const activeOrgan = organs[selectedOrgan];

  // Helper to determine opacity
  const getOpacity = (id: string) => {
    return selectedOrgan === id ? 1.0 : 0.35;
  };

  // Helper to determine border/glow
  const getGlow = (id: string) => {
    return selectedOrgan === id 
      ? 'stroke-biology-500 stroke-[3px] filter drop-shadow-[0_0_8px_rgba(242,124,19,0.9)] scale-105' 
      : 'stroke-slate-700 stroke-1 hover:stroke-slate-450 hover:scale-[1.02]';
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl justify-between">
      <div>
        <h3 className="text-lg font-bold flex items-center gap-2 text-biology-400">
          <HeartPulse className="h-5 w-5 text-biology-400" />
          Giải phẫu tương tác
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Rê chuột (hoặc click) vào các cơ quan trên hình minh họa để xem chi tiết thông tin giải phẫu và sinh lí.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 my-3 items-stretch">
        {/* Interactive SVG Diagram - 2 columns */}
        <div className="col-span-1 sm:col-span-2 flex justify-center bg-slate-950/40 border border-slate-850 p-2 rounded-xl relative h-72 sm:h-96">
          <svg viewBox="0 0 120 220" className="h-full w-auto">
            {/* Outline body background shadow */}
            <path 
              d="M 60,10 C 50,10 40,15 35,25 C 32,32 30,40 30,48 C 30,60 38,70 38,80 C 35,95 28,110 28,130 C 28,160 35,200 35,215 L 85,215 C 85,200 92,160 92,130 C 92,110 85,95 82,80 C 82,70 90,60 90,48 C 90,40 88,32 85,25 C 80,15 70,10 60,10 Z"
              className="fill-slate-950/80 stroke-slate-800 stroke-[1.5]"
            />

            {/* Mouth */}
            <ellipse 
              cx="60" cy="36" rx="6" ry="4"
              className={`fill-orange-400 cursor-pointer transition-all duration-300 ${getGlow('mouth')}`}
              opacity={getOpacity('mouth')}
              onClick={() => setSelectedOrgan('mouth')}
              onMouseEnter={() => setSelectedOrgan('mouth')}
            />

            {/* Esophagus */}
            <path 
              d="M 60,40 L 60,78"
              className={`fill-none cursor-pointer transition-all duration-300 ${getGlow('esophagus')}`}
              strokeWidth="4.5"
              strokeLinecap="round"
              opacity={getOpacity('esophagus')}
              onClick={() => setSelectedOrgan('esophagus')}
              onMouseEnter={() => setSelectedOrgan('esophagus')}
            />

            {/* Liver */}
            <path 
              d="M 52,78 C 52,78 40,80 42,90 C 44,98 56,92 56,86 Z"
              className={`fill-rose-700 cursor-pointer transition-all duration-300 ${getGlow('liver')}`}
              opacity={getOpacity('liver')}
              onClick={() => setSelectedOrgan('liver')}
              onMouseEnter={() => setSelectedOrgan('liver')}
            />

            {/* Stomach */}
            <path 
              d="M 58,80 C 68,80 78,84 74,96 C 70,108 52,106 52,94 C 52,86 58,80 58,80 Z"
              className={`fill-orange-500 cursor-pointer transition-all duration-300 ${getGlow('stomach')}`}
              opacity={getOpacity('stomach')}
              onClick={() => setSelectedOrgan('stomach')}
              onMouseEnter={() => setSelectedOrgan('stomach')}
            />

            {/* Pancreas */}
            <path 
              d="M 54,98 L 68,98 C 68,98 70,102 65,102 L 54,101 Z"
              className={`fill-yellow-400 cursor-pointer transition-all duration-300 ${getGlow('pancreas')}`}
              opacity={getOpacity('pancreas')}
              onClick={() => setSelectedOrgan('pancreas')}
              onMouseEnter={() => setSelectedOrgan('pancreas')}
            />

            {/* Large Intestine */}
            <path 
              d="M 44,115 L 44,142 L 76,142 L 76,115 L 70,115 L 70,136 L 50,136 L 50,115 Z"
              className={`fill-none cursor-pointer transition-all duration-300 ${getGlow('large_intestine')}`}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={getOpacity('large_intestine')}
              onClick={() => setSelectedOrgan('large_intestine')}
              onMouseEnter={() => setSelectedOrgan('large_intestine')}
            />

            {/* Small Intestine */}
            <path 
              d="M 48,118 Q 60,110 52,122 T 62,126 T 58,131 Q 68,131 60,118"
              className={`fill-none cursor-pointer transition-all duration-300 ${getGlow('small_intestine')}`}
              strokeWidth="4"
              strokeLinecap="round"
              opacity={getOpacity('small_intestine')}
              onClick={() => setSelectedOrgan('small_intestine')}
              onMouseEnter={() => setSelectedOrgan('small_intestine')}
            />
          </svg>
        </div>

        {/* Info card display - 3 columns */}
        <div className="col-span-1 sm:col-span-3 flex flex-col justify-center">
          {activeOrgan ? (
            <div className="bg-slate-950 p-4 rounded-xl border border-biology-800/30 flex flex-col gap-2.5 h-full min-h-[280px] sm:min-h-[320px]">
              <div>
                <span className="text-[9px] font-bold text-biology-400 bg-biology-950/50 border border-biology-900/50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {activeOrgan.type}
                </span>
                <h4 className="text-sm font-black text-white mt-1.5">{activeOrgan.name}</h4>
              </div>
              
              <p className="text-xs text-slate-400 leading-relaxed flex-1">
                {activeOrgan.desc}
              </p>

              {activeOrgan.enzymes && (
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 flex items-start gap-1.5">
                  <Info className="h-3.5 w-3.5 text-biology-400 flex-shrink-0 mt-0.5" />
                  <div className="text-[10px] text-slate-400">
                    <span className="font-semibold text-white">Dịch tiết/Enzyme chính:</span> {activeOrgan.enzymes}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center justify-center text-center text-slate-400 text-xs min-h-[320px]">
              Rê chuột vào một cơ quan để xem thông tin chi tiết.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigestionSim;
