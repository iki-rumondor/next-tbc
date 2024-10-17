import BasicCard from '@/components/Card/BasicCard'
import React from 'react'
import MainGraph from './graph'

export default function Page() {
  return (
    <div className="pb-5 px-3">
      <h1 className="text-title-lg font-medium mb-4">
        Selamat Datang Kepala Dinas
      </h1>
      <BasicCard title="Grafik Angka Kasus TBC Tahun Ke Tahun">
        <MainGraph />
      </BasicCard>
    </div>
  )
}
