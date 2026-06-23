import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Download, FileText } from 'lucide-react';
import { subscribeToRecaps, deleteRecap } from '../firebase';

export default function TeacherRecapPage() {
  const navigate = useNavigate();
  const [recapData, setRecapData] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToRecaps((data) => {
      setRecapData(data);
    });
    return () => unsubscribe();
  }, []);

  const handleDeleteRow = async (index, groupName, id) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data kelompok "${groupName || 'Tanpa Nama'}"?`)) {
      await deleteRecap(id, index);
      setRecapData(prev => prev.filter((item, idx) => item.id !== id && idx !== index));
    }
  };

  const exportToCSV = () => {
    if (recapData.length === 0) {
      alert("Belum ada data untuk diekspor.");
      return;
    }

    const headers = [
      "No",
      "Nama Kelompok",
      "Anggota & Absen",
      "Skor Misi",
      "Apa yang disukai",
      "Lebih paham teks deskripsi?",
      "Info baru yang didapat",
      "Perasaan setelah bermain",
      "Kategori Evaluasi Akhir"
    ];

    const rows = recapData.map((group, idx) => {
      const membersText = group.members.map(m => `${m.name} (Absen: ${m.absen})`).join('; ');
      const q1Text = Array.isArray(group.reflections?.q1) ? group.reflections.q1.join(', ') : '-';
      const q2Text = group.reflections?.q2 || '-';
      const q3Text = group.reflections?.q3 || '-';
      const q4Text = group.reflections?.q4 || '-';
      
      return [
        idx + 1,
        `"${group.groupName || '-'}"`,
        `"${membersText}"`,
        group.missionScore || 0,
        `"${q1Text}"`,
        `"${q2Text}"`,
        `"${q3Text}"`,
        `"${q4Text}"`,
        `"${group.category || '-'}"`
      ].join(',');
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Nilai_De_Strip_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen w-full relative overflow-y-auto bg-[#F8F9FA] font-sans flex flex-col items-center">
      
      {/* Background Header */}
      <div className="w-full bg-[#39B54A] pb-24 pt-8 px-4 rounded-b-[40px] shadow-lg relative">
        <div className="absolute inset-0 bg-black/10 rounded-b-[40px] pointer-events-none" />
        
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between relative z-10">
          <button 
            onClick={() => navigate('/')}
            className="bg-white text-[#39B54A] hover:bg-gray-100 transition-colors w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95"
          >
            <ArrowLeft size={28} strokeWidth={3} />
          </button>

          <h1 className="font-tropika text-2xl md:text-4xl text-white tracking-widest text-center flex items-center gap-3">
            <FileText size={36} /> REKAP NILAI GURU
          </h1>

          <div className="w-12 h-12 md:w-14 md:h-14" /> {/* Spacer */}
        </div>
      </div>

      {/* Main Content Card */}
      <div className="w-full max-w-7xl px-4 -mt-16 mb-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-gray-100 p-6 md:p-8">
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b-2 border-gray-100 pb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Data Kelompok Tersimpan</h2>
              <p className="text-gray-500 text-sm mt-1">Menampilkan riwayat penyelesaian misi dari seluruh kelompok.</p>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <button 
                onClick={exportToCSV}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#F68026] text-white hover:bg-[#d96a1a] px-5 py-3 rounded-xl font-bold shadow-md transition-colors"
              >
                <Download size={20} /> Ekspor CSV
              </button>
            </div>
          </div>

          {/* Table */}
          {recapData.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FileText size={48} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-700">Belum ada data!</h3>
              <p className="text-gray-500 mt-2">Data rekap akan otomatis muncul di sini setelah kelompok menyelesaikan seluruh alur permainan hingga menekan tombol "Kembali ke Beranda".</p>
            </div>
          ) : (
            <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 shadow-inner custom-scrollbar">
              <table className="w-full min-w-[1200px] text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="p-4 font-bold text-gray-700 w-12 text-center">No</th>
                    <th className="p-4 font-bold text-gray-700 w-48">Kelompok & Skor</th>
                    <th className="p-4 font-bold text-gray-700 min-w-[200px]">Anggota & No Absen</th>
                    <th className="p-4 font-bold text-gray-700 w-48">Kategori Evaluasi</th>
                    <th className="p-4 font-bold text-gray-700 min-w-[300px]">Data Refleksi Siswa</th>
                    <th className="p-4 font-bold text-gray-700 w-24 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recapData.map((group, idx) => (
                    <tr key={group.id || idx} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-center font-bold text-gray-500">{idx + 1}</td>
                      
                      <td className="p-4 align-top">
                        <div className="font-bold text-lg text-gray-800">{group.groupName}</div>
                        <div className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold mt-2">
                           ⭐ {group.missionScore} Poin
                        </div>
                      </td>
                      
                      <td className="p-4 align-top">
                        <ul className="space-y-1">
                          {group.members.map((m, mIdx) => (
                            <li key={mIdx} className="text-sm bg-white border border-gray-100 rounded-lg px-3 py-2 flex justify-between shadow-sm">
                              <span className="font-semibold text-gray-700">{m.name}</span>
                              <span className="text-gray-500 text-xs bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">Absen: {m.absen}</span>
                            </li>
                          ))}
                        </ul>
                      </td>

                      <td className="p-4 align-top">
                        <div className="font-bold text-green-700 bg-green-100 px-3 py-2 rounded-xl text-center border border-green-200">
                          {group.category}
                        </div>
                      </td>

                      <td className="p-4 align-top text-sm">
                        <div className="space-y-3">
                          <div>
                            <span className="font-bold text-gray-700 block text-xs uppercase mb-1">Paling disukai:</span>
                            <div className="text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
                              {Array.isArray(group.reflections?.q1) && group.reflections.q1.length > 0 
                                ? group.reflections.q1.join(', ') 
                                : '-'}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="font-bold text-gray-700 block text-xs uppercase mb-1">Paham Teks:</span>
                              <div className="text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">{group.reflections?.q2 || '-'}</div>
                            </div>
                            <div>
                              <span className="font-bold text-gray-700 block text-xs uppercase mb-1">Perasaan:</span>
                              <div className="text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">{group.reflections?.q4 || '-'}</div>
                            </div>
                          </div>

                          <div>
                            <span className="font-bold text-gray-700 block text-xs uppercase mb-1">Info Baru:</span>
                            <div className="text-gray-600 bg-blue-50 px-3 py-2 rounded-lg italic">
                              "{group.reflections?.q3 || '-'}"
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 align-top text-center">
                        <button 
                          onClick={() => handleDeleteRow(idx, group.groupName, group.id)}
                          className="bg-red-100 text-red-600 hover:bg-red-200 p-2.5 rounded-xl font-bold transition-colors inline-flex items-center justify-center shadow-sm active:scale-95 cursor-pointer"
                          title="Hapus Kelompok"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
