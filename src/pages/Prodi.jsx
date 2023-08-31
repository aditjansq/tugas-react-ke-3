import { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from "react-router-dom"

const Prodi = () => {

  const navigate = useNavigate();

  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await axios.get("https://strapi-rygs.onrender.com/api/prodis");
    console.log(res.data.data[0].attributes.prodi[0]);
    setData(res.data.data[0].attributes.prodi[0]);
  }

  useEffect(() => {
    fetchData()
  }, []);

  const generateNPM = (tahun_masuk, kode_prodi, kode_unik) => {
    const tahunMasuk = tahun_masuk.slice(-2);
    const tahunLulus = parseInt(tahunMasuk) + 4
    const kodeUnik = ("000" + kode_unik).slice(-4);
    return tahunMasuk + tahunLulus + kode_prodi + kodeUnik
  }

  return (
    <div>
      {data?.map((prodi, index) => (
        <div key={index}>
          <div className="text-xl ">Kode Prodi : {prodi.kode_prodi}</div>
          <div className="text-xl font-medium">Nama Prodi : {prodi.nama_prodi}</div>
          <div>Kepala Prodi : {prodi.kepala_prodi}</div>
          {prodi.sektretaris && <div>Sekretaris : {prodi.sektretaris}</div>}

          {prodi.mahasiswa.map((angkatan, index) => (
            <div key={index}>
              <br />
              <div>Angkatan : {angkatan.tahun_masuk}</div>

              {["pagi", "malam", "cuti"].map((kelas, index) => (
                <div key={index}>

                  <div className='mt-5'>Kelas : {kelas}</div>

                  {angkatan.data[kelas].length !== 0 ? (
                    <table class="w-full md:table-fixed text-left mt-2 border ">
                      <thead>
                        <tr className='bg-lime-600'>
                          <th className='p-1'>NPM</th>
                          <th>Nama</th>
                          <th>Jenis Kelamin</th>
                          <th>Alamat</th>
                          <th>Hobi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {angkatan.data[kelas].map((mahasiswa, index) => (
                          <tr key={index} className='hover:bg-stone-600'>
                            <td onClick={() => navigate(`/mahasiswa/${generateNPM(angkatan.tahun_masuk, prodi.kode_prodi, mahasiswa.id)}`)}
                            className='p-1 cursor-pointer'>
                              {generateNPM(angkatan.tahun_masuk, prodi.kode_prodi, mahasiswa.id)}
                            </td>
                            <td >{mahasiswa.nama}</td>
                            <td >{
                              mahasiswa.jenis_kelamin === "L" ? "Laki-laki" :
                                mahasiswa.jenis_kelamin === "P" ? "Perempuan" : "Tidak Diketahui"
                            }</td>
                            <td >{mahasiswa.alamat}</td>
                            <td >{mahasiswa.hobi.join(", ")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div>
                      Tidak ada mahasiswa yang mengambil kelas ini.
                    </div>
                  )}




                </div>
              ))}



            </div>
          ))}


          <br />
        </div>
      ))}

    </div>
  )
}

export default Prodi