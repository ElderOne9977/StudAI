import React, { useState, useEffect } from 'react';
import { Calculator, Info, Check, CornerDownRight, AlertCircle } from 'lucide-react';

interface SmartCalculatorProps {
  type: 'density' | 'pressure' | 'concentration' | 'lever';
  subjectColor: 'chemistry' | 'physics' | 'biology';
}

export const SmartCalculator: React.FC<SmartCalculatorProps> = ({ type, subjectColor }) => {
  // Inputs stored as strings to handle typing easily
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [solutionSteps, setSolutionSteps] = useState<string[]>([]);
  const [result, setResult] = useState<string>('');

  // Reset calculator states when type changes to prevent state leak
  useEffect(() => {
    setInputs({});
    setSolutionSteps([]);
    setResult('');
  }, [type]);

  const colorStyles = {
    chemistry: {
      accent: 'text-chemistry-500',
      btn: 'bg-chemistry-600 hover:bg-chemistry-700 text-white',
      border: 'border-chemistry-200 dark:border-chemistry-800/40',
      bg: 'bg-chemistry-50/50 dark:bg-chemistry-950/20'
    },
    physics: {
      accent: 'text-physics-500',
      btn: 'bg-physics-600 hover:bg-physics-700 text-white',
      border: 'border-physics-200 dark:border-physics-800/40',
      bg: 'bg-physics-50/50 dark:bg-physics-950/20'
    },
    biology: {
      accent: 'text-biology-500',
      btn: 'bg-biology-600 hover:bg-biology-700 text-white',
      border: 'border-biology-200 dark:border-biology-800/40',
      bg: 'bg-biology-50/50 dark:bg-biology-950/20'
    }
  }[subjectColor];

  const handleInputChange = (name: string, value: string) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculate = () => {
    const steps: string[] = [];
    let calculatedVal = '';

    if (type === 'density') {
      const mVal = parseFloat(inputs.m || '');
      const vVal = parseFloat(inputs.v || '');
      const dVal = parseFloat(inputs.d || '');

      // Check which field is empty and calculate it
      if (!isNaN(mVal) && !isNaN(vVal) && isNaN(dVal)) {
        // Solve for D = m / V
        const d = mVal / vVal;
        steps.push(`Bước 1: Xác định giả thiết bài cho: Khối lượng m = ${mVal} kg, Thể tích V = ${vVal} m³.`);
        steps.push(`Bước 2: Áp dụng công thức tính Khối lượng riêng: D = m / V.`);
        steps.push(`Bước 3: Thay số vào công thức: D = ${mVal} / ${vVal} = ${d.toFixed(2)} kg/m³.`);
        calculatedVal = `Khối lượng riêng D = ${d.toFixed(2)} kg/m³`;
      } else if (!isNaN(dVal) && !isNaN(vVal) && isNaN(mVal)) {
        // Solve for m = D * V
        const m = dVal * vVal;
        steps.push(`Bước 1: Xác định giả thiết bài cho: Khối lượng riêng D = ${dVal} kg/m³, Thể tích V = ${vVal} m³.`);
        steps.push(`Bước 2: Áp dụng công thức tính Khối lượng: m = D × V.`);
        steps.push(`Bước 3: Thay số vào công thức: m = ${dVal} × ${vVal} = ${m.toFixed(2)} kg.`);
        calculatedVal = `Khối lượng m = ${m.toFixed(2)} kg`;
      } else if (!isNaN(mVal) && !isNaN(dVal) && isNaN(vVal)) {
        // Solve for V = m / D
        const v = mVal / dVal;
        steps.push(`Bước 1: Xác định giả thiết bài cho: Khối lượng m = ${mVal} kg, Khối lượng riêng D = ${dVal} kg/m³.`);
        steps.push(`Bước 2: Áp dụng công thức tính Thể tích: V = m / D.`);
        steps.push(`Bước 3: Thay số vào công thức: V = ${mVal} / ${dVal} = ${v.toFixed(4)} m³.`);
        calculatedVal = `Thể tích V = ${v.toFixed(4)} m³`;
      } else {
        steps.push('Lỗi: Vui lòng nhập đúng 2 trong 3 thông số (để trống ô cần tính).');
      }
    } 
    
    else if (type === 'pressure') {
      const fVal = parseFloat(inputs.f || '');
      const sVal = parseFloat(inputs.s || '');
      const pVal = parseFloat(inputs.p || '');

      if (!isNaN(fVal) && !isNaN(sVal) && isNaN(pVal)) {
        const p = fVal / sVal;
        steps.push(`Bước 1: Tóm tắt giả thiết: Áp lực F = ${fVal} N, Diện tích bị ép S = ${sVal} m².`);
        steps.push(`Bước 2: Áp dụng công thức tính áp suất: p = F / S.`);
        steps.push(`Bước 3: Thay số và giải: p = ${fVal} / ${sVal} = ${p.toFixed(2)} Pa (hoặc N/m²).`);
        calculatedVal = `Áp suất p = ${p.toFixed(2)} Pa`;
      } else if (!isNaN(pVal) && !isNaN(sVal) && isNaN(fVal)) {
        const f = pVal * sVal;
        steps.push(`Bước 1: Tóm tắt giả thiết: Áp suất p = ${pVal} Pa, Diện tích bị ép S = ${sVal} m².`);
        steps.push(`Bước 2: Áp dụng công thức tính áp lực: F = p × S.`);
        steps.push(`Bước 3: Thay số và giải: F = ${pVal} × ${sVal} = ${f.toFixed(2)} N.`);
        calculatedVal = `Áp lực F = ${f.toFixed(2)} N`;
      } else if (!isNaN(fVal) && !isNaN(pVal) && isNaN(sVal)) {
        const s = fVal / pVal;
        steps.push(`Bước 1: Tóm tắt giả thiết: Áp lực F = ${fVal} N, Áp suất p = ${pVal} Pa.`);
        steps.push(`Bước 2: Áp dụng công thức tính diện tích bị ép: S = F / p.`);
        steps.push(`Bước 3: Thay số và giải: S = ${fVal} / ${pVal} = ${s.toFixed(4)} m².`);
        calculatedVal = `Diện tích S = ${s.toFixed(4)} m²`;
      } else {
        steps.push('Lỗi: Vui lòng nhập đúng 2 trong 3 thông số (để trống ô cần tính).');
      }
    } 
    
    else if (type === 'concentration') {
      const mctVal = parseFloat(inputs.mct || '');
      const mddVal = parseFloat(inputs.mdd || '');
      const cVal = parseFloat(inputs.cPercent || '');

      if (!isNaN(mctVal) && !isNaN(mddVal) && isNaN(cVal)) {
        const c = (mctVal / mddVal) * 100;
        steps.push(`Bước 1: Nhận biết giả thiết: Khối lượng chất tan m_ct = ${mctVal} g, Khối lượng dung dịch m_dd = ${mddVal} g.`);
        steps.push(`Bước 2: Chọn công thức nồng độ phần trăm: C% = (m_ct / m_dd) × 100%.`);
        steps.push(`Bước 3: Thay số vào giải chi tiết: C% = (${mctVal} / ${mddVal}) × 100% = ${c.toFixed(2)}%.`);
        calculatedVal = `Nồng độ phần trăm C% = ${c.toFixed(2)}%`;
      } else if (!isNaN(cVal) && !isNaN(mddVal) && isNaN(mctVal)) {
        const mct = (cVal * mddVal) / 100;
        steps.push(`Bước 1: Nhận biết giả thiết: Nồng độ C% = ${cVal}%, Khối lượng dung dịch m_dd = ${mddVal} g.`);
        steps.push(`Bước 2: Chọn công thức tính khối lượng chất tan: m_ct = (m_dd × C%) / 100.`);
        steps.push(`Bước 3: Thay số vào giải chi tiết: m_ct = (${mddVal} × ${cVal}) / 100 = ${mct.toFixed(2)} g.`);
        calculatedVal = `Khối lượng chất tan m_ct = ${mct.toFixed(2)} g`;
      } else if (!isNaN(mctVal) && !isNaN(cVal) && isNaN(mddVal)) {
        const mdd = (mctVal * 100) / cVal;
        steps.push(`Bước 1: Nhận biết giả thiết: Khối lượng chất tan m_ct = ${mctVal} g, Nồng độ C% = ${cVal}%.`);
        steps.push(`Bước 2: Chọn công thức tính khối lượng dung dịch: m_dd = (m_ct × 100) / C%.`);
        steps.push(`Bước 3: Thay số vào giải chi tiết: m_dd = (${mctVal} × 100) / ${cVal} = ${mdd.toFixed(2)} g.`);
        calculatedVal = `Khối lượng dung dịch m_dd = ${mdd.toFixed(2)} g`;
      } else {
        steps.push('Lỗi: Vui lòng nhập đúng 2 trong 3 thông số (để trống ô cần tính).');
      }
    } 
    
    else if (type === 'lever') {
      const f1Val = parseFloat(inputs.f1 || '');
      const d1Val = parseFloat(inputs.d1 || '');
      const f2Val = parseFloat(inputs.f2 || '');
      const d2Val = parseFloat(inputs.d2 || '');

      const countNaN = [f1Val, d1Val, f2Val, d2Val].filter(v => isNaN(v)).length;

      if (countNaN === 1) {
        if (isNaN(f1Val)) {
          const f1 = (f2Val * d2Val) / d1Val;
          steps.push(`Bước 1: Nhận biết giả thiết: d1 = ${d1Val} m, F2 = ${f2Val} N, d2 = ${d2Val} m.`);
          steps.push(`Bước 2: Áp dụng điều kiện cân bằng đòn bẩy: F1 × d1 = F2 × d2  =>  F1 = (F2 × d2) / d1.`);
          steps.push(`Bước 3: Thay số và giải: F1 = (${f2Val} × ${d2Val}) / ${d1Val} = ${f1.toFixed(2)} N.`);
          calculatedVal = `Lực F1 = ${f1.toFixed(2)} N`;
        } else if (isNaN(d1Val)) {
          const d1 = (f2Val * d2Val) / f1Val;
          steps.push(`Bước 1: Nhận biết giả thiết: F1 = ${f1Val} N, F2 = ${f2Val} N, d2 = ${d2Val} m.`);
          steps.push(`Bước 2: Áp dụng điều kiện cân bằng đòn bẩy: F1 × d1 = F2 × d2  =>  d1 = (F2 × d2) / F1.`);
          steps.push(`Bước 3: Thay số và giải: d1 = (${f2Val} × ${d2Val}) / ${f1Val} = ${d1.toFixed(3)} m.`);
          calculatedVal = `Cánh tay đòn d1 = ${d1.toFixed(3)} m`;
        } else if (isNaN(f2Val)) {
          const f2 = (f1Val * d1Val) / d2Val;
          steps.push(`Bước 1: Nhận biết giả thiết: F1 = ${f1Val} N, d1 = ${d1Val} m, d2 = ${d2Val} m.`);
          steps.push(`Bước 2: Áp dụng điều kiện cân bằng đòn bẩy: F1 × d1 = F2 × d2  =>  F2 = (F1 × d1) / d2.`);
          steps.push(`Bước 3: Thay số và giải: F2 = (${f1Val} × ${d1Val}) / ${d2Val} = ${f2.toFixed(2)} N.`);
          calculatedVal = `Lực F2 = ${f2.toFixed(2)} N`;
        } else if (isNaN(d2Val)) {
          const d2 = (f1Val * d1Val) / f2Val;
          steps.push(`Bước 1: Nhận biết giả thiết: F1 = ${f1Val} N, d1 = ${d1Val} m, F2 = ${f2Val} N.`);
          steps.push(`Bước 2: Áp dụng điều kiện cân bằng đòn bẩy: F1 × d1 = F2 × d2  =>  d2 = (F1 × d1) / F2.`);
          steps.push(`Bước 3: Thay số và giải: d2 = (${f1Val} × ${d1Val}) / ${f2Val} = ${d2.toFixed(3)} m.`);
          calculatedVal = `Cánh tay đòn d2 = ${d2.toFixed(3)} m`;
        }
      } else {
        steps.push('Lỗi: Hãy nhập chính xác 3 trong 4 thông số của đòn bẩy để tìm đại lượng còn lại.');
      }
    }

    setSolutionSteps(steps);
    setResult(calculatedVal);
  };

  const handleClear = () => {
    setInputs({});
    setSolutionSteps([]);
    setResult('');
  };

  const renderInputs = () => {
    let schema: { name: string; label: string; unit: string; placeholder: string }[] = [];
    if (type === 'density') {
      schema = [
        { name: 'm', label: 'Khối lượng (m)', unit: 'kg', placeholder: 'Nhập m...' },
        { name: 'v', label: 'Thể tích (V)', unit: 'm³', placeholder: 'Nhập V...' },
        { name: 'd', label: 'Khối lượng riêng (D)', unit: 'kg/m³', placeholder: 'Nhập D (để trống nếu cần tính)...' }
      ];
    } else if (type === 'pressure') {
      schema = [
        { name: 'f', label: 'Áp lực (F)', unit: 'N', placeholder: 'Nhập lực F...' },
        { name: 's', label: 'Diện tích bị ép (S)', unit: 'm²', placeholder: 'Nhập diện tích S...' },
        { name: 'p', label: 'Áp suất (p)', unit: 'Pa', placeholder: 'Nhập p (để trống nếu cần tính)...' }
      ];
    } else if (type === 'concentration') {
      schema = [
        { name: 'mct', label: 'Khối lượng chất tan (m_ct)', unit: 'g', placeholder: 'Nhập m_ct...' },
        { name: 'mdd', label: 'Khối lượng dung dịch (m_dd)', unit: 'g', placeholder: 'Nhập m_dd...' },
        { name: 'cPercent', label: 'Nồng độ % (C%)', unit: '%', placeholder: 'Nhập C% (để trống nếu cần tính)...' }
      ];
    } else if (type === 'lever') {
      schema = [
        { name: 'f1', label: 'Lực cản F1', unit: 'N', placeholder: 'Nhập F1...' },
        { name: 'd1', label: 'Cánh tay đòn d1', unit: 'm', placeholder: 'Nhập d1...' },
        { name: 'f2', label: 'Lực kéo F2', unit: 'N', placeholder: 'Nhập F2...' },
        { name: 'd2', label: 'Cánh tay đòn d2', unit: 'm', placeholder: 'Nhập d2 (để trống nếu cần tính)...' }
      ];
    }

    return (
      <div className="space-y-3">
        {schema.map((field) => (
          <div key={field.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-350 sm:w-1/3">{field.label}</label>
            <div className="flex-1 flex gap-2">
              <input
                type="number"
                step="any"
                className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:border-physics-500 dark:focus:border-physics-500 text-slate-800 dark:text-slate-100 font-mono shadow-sm"
                placeholder={field.placeholder}
                value={inputs[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              />
              <span className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-bold text-slate-400 select-none flex items-center justify-center min-w-[44px]">
                {field.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const isError = solutionSteps.length === 1 && solutionSteps[0].startsWith('Lỗi');

  return (
    <div className={`rounded-2xl border ${colorStyles.border} p-5 ${colorStyles.bg} flex flex-col gap-4`}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
          <Calculator className={`h-4.5 w-4.5 ${colorStyles.accent}`} />
          Giải Bài Tập Tự Động (Smart Solver)
        </h4>
        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
          <Info className="h-3.5 w-3.5" /> Để trống 1 ô cần tìm
        </span>
      </div>

      {/* Input Fields */}
      {renderInputs()}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleClear}
          className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-xs font-semibold text-slate-500 dark:text-slate-400"
        >
          Xóa số liệu
        </button>
        <button
          onClick={handleCalculate}
          className={`flex-1 py-2 rounded-xl font-bold text-xs transition-colors ${colorStyles.btn}`}
        >
          Giải bài toán
        </button>
      </div>

      {/* Step by Step Output */}
      {solutionSteps.length > 0 && (
        <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-4 mt-1 space-y-3">
          {isError ? (
            <div className="bg-rose-50/50 dark:bg-rose-950/10 border border-rose-500/30 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-rose-600 dark:text-rose-400 leading-relaxed">
              <AlertCircle className="h-4.5 w-4.5 flex-shrink-0 mt-0.5 text-rose-500 animate-pulse" />
              <div>
                <span className="font-bold block mb-0.5">Phát hiện lỗi nhập liệu</span>
                <span>{solutionSteps[0].replace('Lỗi: ', '')}</span>
              </div>
            </div>
          ) : (
            <>
              <h5 className="text-xs font-bold text-slate-700 dark:text-slate-200">Lời giải chi tiết từng bước:</h5>
              
              <div className="space-y-2.5">
                {solutionSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed items-start">
                    <CornerDownRight className={`h-4 w-4 flex-shrink-0 mt-0.5 ${colorStyles.accent}`} />
                    <span className={idx === solutionSteps.length - 1 && result ? "font-bold text-slate-800 dark:text-slate-200" : ""}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              {result && (
                <div className="bg-white dark:bg-slate-900 border border-green-200 dark:border-green-950 p-3 rounded-xl flex items-center gap-2.5 mt-2 animate-pulse-subtle">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 block uppercase">Kết quả cuối</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-green-400">{result}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default SmartCalculator;
