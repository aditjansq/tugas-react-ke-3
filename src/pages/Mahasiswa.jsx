import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from 'axios';


const Mahasiswa = () => {
    const NPM = useParams();
    // console.log(NPM)
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

    function npm(){
        return NPM.id
    }

    function kodeProdi(){
        return npm().slice(4,6)
    }

    function tahunMasuk(){
        return '20' + npm().slice(0,2)
    }

    function kodeUnik(){
        return npm().slice(-4)
    }

    function cekProdi(data) {
        return data.kode_prodi === parseInt(kodeProdi());
    }

    function cekTahunMasuk(mahasiswa){
        return mahasiswa.tahun_masuk === tahunMasuk();
    }

    function cekDataPribadi(dataPribadi){
        return dataPribadi.id == kodeUnik();
    }

    function cekMahasiswa(){
        const dataTahunMasuk = data.find(cekProdi).mahasiswa.find(cekTahunMasuk)
        const jadwal = ["pagi", "malam", "cuti"]
        let dataPribadi = null
        for(let i = 0 ; i < 3 ; i++){
            if( dataTahunMasuk.data[jadwal[i]].find(cekDataPribadi) != undefined ){
                dataPribadi = dataTahunMasuk.data[jadwal[i]].find(cekDataPribadi)
                break;
            }
        }
        console.log(dataPribadi)

        // const dataPribadi = jadwal?.map((kelas, index) => (
        //     dataTahunMasuk.data[kelas].find(cekDataPribadi)  
        // )).filter(data => data != undefined)[0]
        // console.log(dataPribadi)
        return dataPribadi
    }

    // if(data && data){
    //     // console.log(data.find(cekProdi).mahasiswa.find(cekTahunMasuk))
    //     cekMahasiswa()
    // }

    return (
        <div>
            {data && data ?
            (cekMahasiswa() !== null ?
                (
                    <div>
                        <h1 className="text-2xl">Data Mahasiswa</h1>
                        <h3 className="mt-4">NPM : {npm()}</h3>
                        <h3>Nama : {cekMahasiswa().nama}</h3>
                        <h3>Jenis Kelamin : {cekMahasiswa().jenis_kelamin == 'L' ? 'Laki-laki' : 'Perempuan'} </h3>
                        <h3>Alamat : {cekMahasiswa().alamat}</h3>
                        <h3>Hobi : {cekMahasiswa().hobi.join(', ')}</h3>
                        <div className="mt-2">
                            <button className="p-1 px-5 bg-blue-500 rounded" onClick={() => navigate("/prodi")}>Prodi</button>
                        </div>
                    </div>
                )
                :
                (
                    <div>
                        <h1 className="text-2xl">Data Mahasiswa</h1>
                        <h3  className="mt-4">Mahasiswa Tidak Terdata!</h3>
                        <div className="mt-2">
                            <button className="p-1 px-5 bg-blue-500 rounded" onClick={() => navigate("/prodi")}>Prodi</button>
                        </div>
                    </div>
                )
            )
            :
            (
                <div>
                    {/* <h3 className="text-2xl">Loading</h3> */}
                </div>
            )
            }
            
        </div>
    )
}

export default Mahasiswa