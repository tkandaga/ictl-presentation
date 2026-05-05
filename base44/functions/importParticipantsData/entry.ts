import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SPREADSHEET_ID = '1yLIYFFDKjoL8ZearUiRf9B1HUnHlsl3voZmsQw9IN5M';

const ROOM_HEADERS = {
  'ROOM 1':  { moderator: 'Valeria Yekti Kwasaning Gusti, M.Pd.', it: 'Renaldy Setiawan, S.Kom.', invitedSpeaker: 'Dr. Kristof Fenyvesi' },
  'ROOM 2':  { moderator: 'Saddam Fathurrachman, M.Pd.', it: '', invitedSpeaker: 'Dr. Prakash V. Arumuga' },
  'ROOM 3':  { moderator: 'Ami Hibatul Jameel, S.Pd., M.A.', it: '', invitedSpeaker: 'Dr. Naila Naseer' },
  'ROOM 4':  { moderator: 'Novi Eka Saputri, M.Pd.', it: 'Rahmat, A.Md.', invitedSpeaker: 'Prof. Kumiko Aoki, Ph.D.' },
  'ROOM 5':  { moderator: 'Dr. Ahmad Syaikhu, M.Pd.', it: '', invitedSpeaker: 'Dr. Richie Tai Ki Kim' },
  'ROOM 6':  { moderator: 'Dr. Karisdha Pradityana, M.Pd.', it: '', invitedSpeaker: 'Prof. Dr. Ir. Amalia Sapriati, M.A.' },
  'ROOM 7':  { moderator: 'Ir. Ida Zubaidah, M.A., Ed.D.', it: 'Rhomadhon, S.Pd.', invitedSpeaker: 'Dr. Siti Julaeha, M.A.' },
  'ROOM 8':  { moderator: 'Hidayah, S.Pd., M.Pd.', it: '', invitedSpeaker: 'Dr. Sri Tatminingsih, M.Pd.' },
  'ROOM 9':  { moderator: 'Dwi Rezki Hardianto Putra Rustan, S.S., M.A', it: '', invitedSpeaker: 'Dr. Andayani, M.Ed.' },
  'ROOM 10': { moderator: 'Adrian Rasyki, M.Hum.', it: 'Heri Saputra, S.E.', invitedSpeaker: 'Dr. Della Raymena Jovanka, S.Pd., M.Si.' },
  'ROOM 11': { moderator: 'Nurul Isra Fauziah, M.Sc.', it: '', invitedSpeaker: 'Dra. Titi Chandrawati, M.Ed., Ph.D.' },
  'ROOM 12': { moderator: 'Dr. Yati, M.Pd.', it: '', invitedSpeaker: '' },
  'ROOM 13': { moderator: 'Indri Annisa, M.Pd.', it: 'Siti Halimah, S.Pd.', invitedSpeaker: '' },
  'ROOM 14': { moderator: 'Dola Suciana, M.Pd.', it: '', invitedSpeaker: '' },
  'ROOM 15': { moderator: 'Agnisa Widayanti, M.Pd.', it: 'Firdauza Dwi Sumanti, S.Kom.', invitedSpeaker: '' },
  'ROOM 16': { moderator: 'Sari Wardani Simarmata, M.Pd.', it: '', invitedSpeaker: '' },
};

// [name, institution, country, jadwal, type]
// type: 'online' → tampil dengan 🔴, lainnya → normal
const ROOM_PARTICIPANTS = {
  'ROOM 1': [
    ['Kamariah Kamariah','Universitas PGRI Kalimantan','Indonesia','13.40-13.50',''],
    ['Yoseph Satria Praka','Politeknik Negeri Jakarta','Indonesia','13.50-14.00','online'],
    ['Tarina Nurul Lieza','Universitas Pendidikan Indonesia','Indonesia','14.00-14.10',''],
    ['Rizqa Dwi Shofiya Maghfira Izzania','Universitas Bengkulu','Indonesia','14.10-14.20',''],
    ['Hastangka','BRIN (National Research and Innovation Agency) - Indonesia','Indonesia','14.20-14.30',''],
    ['Novasa Adiyani','Politeknik Jatiluhur','Indonesia','14.30-14.40',''],
    ['Sopa Marwah','Universitas Garut','Indonesia','14.40-14.50',''],
    ['Rizky Agassy Sihombing, M.Pd., M.S.','Universitas Pendidikan Indonesia and National Taiwan Normal University','Indonesia','14.50-15.00',''],
    ['Yousef Mohammad Iriqat','Al-Quds Open University','Palestina','15.00-15.10',''],
    ['Della Gita Van Gobel','IAKN Palangka Raya','Indonesia','15.10-15.20',''],
    ['Suryanti','Universitas Muhammadiyah Buton','Indonesia','15.20-15.30',''],
    ['Tyas Prayesti','STIKes Bina Putera Banjar','Indonesia','15.30-15.40',''],
    ['Tri Gunadi, Amd. Ot., S.Ked., S.Psi., Psikolog','Universitas Indonesia','Indonesia','15.40-15.50',''],
    ['Fanissa Narita','Politeknik Jatiluhur','Indonesia','15.50-16.00',''],
  ],
  'ROOM 2': [
    ['Sendi Ramdhani','Universitas Terbuka','Indonesia','13.40-13.50',''],
    ['Ronald Hervin Haloho','Universitas Negeri Medan','Indonesia','13.50-14.00',''],
    ['Dwi Fitra Arreski','Universitas Terbuka','Indonesia','14.00-14.10',''],
    ['Rizky Wardhani','Universitas Negeri Jakarta','Indonesia','14.10-14.20',''],
    ['Rizky Wardhani','Universitas Negeri Jakarta','Indonesia','14.20-14.30',''],
    ['Muhammad Aryuda Silfa','Universitas Terbuka','Indonesia','14.30-14.40',''],
    ['Cindy Azzahra','Universitas Pelita Bangsa','Indonesia','14.40-14.50',''],
    ['Adhi Susilo','Universitas Terbuka','Indonesia','14.50-15.00',''],
    ['Jie Peng','The Open University of Yaan','China','15.00-15.10','online'],
    ['Dina Dahliana','STAI Solok Nan Indah','Indonesia','15.10-15.20',''],
    ['Sherly Anisa Utami','Terbuka University','Indonesia','15.20-15.30',''],
    ['Elsya Fitriani Nuraziziah Utami','Universitas Pendidikan Indonesia','Indonesia','15.30-15.40',''],
    ['Arum Putri Rahayu','STAI Maarif Magetan','Indonesia','15.40-15.50',''],
    ['Sutarsih Sutarsih','Badan Riset dan Inovasi Nasional','Indonesia','15.50-16.00',''],
  ],
  'ROOM 3': [
    ['Ani Mariani','Universitas Negeri Jakarta','Indonesia','13.40-13.50',''],
    ['Sitisamsiyah Samsiyah','Universitas Terbuka','Indonesia','13.50-14.00',''],
    ['Anthony A. Salim','Universitas Negeri Jakarta','Indonesia','14.00-14.10',''],
    ['Etika Khaerunnisa','Universitas Sultan Ageng Tirtayasa','Indonesia','14.10-14.20',''],
    ['Mayasari Manar, M.Pd','Universitas Negeri Jakarta','Indonesia','14.20-14.30',''],
    ['Masmuhah Masmuhah','Alif Iqra','Indonesia','14.30-14.40',''],
    ['Wijanarko Wijanarko','Universitas Terbuka','Indonesia','14.40-14.50',''],
    ['Munaya Nikma Rosyada','Universitas Islam Internasional Indonesia','Indonesia','14.50-15.00',''],
    ['Nofi Maria Krisnawati','Universitas Islam Internasional Indonesia','Indonesia','15.00-15.10',''],
    ['Yasir Riady','Universitas Terbuka','Indonesia','15.10-15.20',''],
    ['Jingyi Zhong','The Open University of Sichuan','China','15.20-15.30','online'],
    ['Holten Sion','Universitas Palangka Raya','Indonesia','15.30-15.40',''],
    ['Radiatan Mardiah And Melati','Universitas Jambi','Indonesia','15.40-15.50',''],
    ['Ayu Ambarwati','TK NEGERI SATU ATAP PANDANSARI NGUNUT TULUNGAGUNG','Indonesia','15.50-16.00',''],
  ],
  'ROOM 4': [
    ['Waway Qodratulloh S','Politeknik Negeri Bandung','Indonesia','13.40-13.50',''],
    ['Tetin Nurfitri','STAI Al Hidayah Tasikmalaya','Indonesia','13.50-14.00',''],
    ['Santi Nisfi Anggraeni','STAI Al Hidayah Tasikmalaya','Indonesia','14.00-14.10',''],
    ['Iis Sintiani','STAI Al Hidayah Tasikmalaya','Indonesia','14.10-14.20',''],
    ['Jackson Pasini Mairing','Universitas Palangka Raya','Indonesia','14.20-14.30',''],
    ['Imam Syafii','Universitas Terbuka','Indonesia','14.30-14.40',''],
    ['M Dahlan R','Universitas Muhammadiyah Tangerang','Indonesia','14.40-14.50','online'],
    ['Sun Hua','SiChuan Open University','China','14.50-15.00',''],
    ['Muhamad Affandi','Universitas Palangka Raya','Indonesia','15.00-15.10',''],
    ['Ryan Prayogi','Universitas Pendidikan Indonesia','Indonesia','15.10-15.20',''],
    ['I Wayan Rudiarta','Ganesha University of Education','Indonesia','15.20-15.30',''],
    ['Desvi Wahyuni','University of Bengkulu','Indonesia','15.30-15.40',''],
    ['Ifat Fatimah Zahro','Universitas Negeri Jakarta (UNJ)','Indonesia','15.40-15.50',''],
    ['Kurroti Ayun','IAI UW Jombang','Indonesia','15.50-16.00',''],
    ['Ani Siti Anisah','Universitas Garut','Indonesia','16.00-16.10',''],
    ['Mohamad Arif Rahmansyah','Universitas Terbuka','Indonesia','16.10-16.20',''],
  ],
  'ROOM 5': [
    ['Indah Purnama Dewi, Mansyur Srisudarso, Tedi Purbangkara','Universitas Singaperbangsa Karawang','Indonesia','13.40-13.50',''],
    ['Reni Tarmini','Universitas Terbuka','Indonesia','13.50-14.00',''],
    ['Nia Jusniani','Universitas Terbuka','Indonesia','14.00-14.10','online'],
    ['Sugama Maskar','Universitas Pendidikan Indonesia','Indonesia','14.10-14.20',''],
    ['Gayatria Oktalina','Universitas Terbuka','Indonesia','14.20-14.30',''],
    ['A A Musyaffa Musyaffa','Universitas Islam Negeri Sulthan Thaha Saifuddin Jambi','Indonesia','14.30-14.40',''],
    ['Dida Firgiawan','SMA Negeri 8 Bandung / Universitas Pendidikan Indonesia','Indonesia','14.40-14.50',''],
    ['Yayuk Hidayah, Nathasa Pramudita Irianti, Rr. Yudiswara Ayu Permatasari','Universitas Negeri Yogyakarta','Indonesia','14.50-15.00',''],
    ['Stephanus Turibius Rahmat','Universitas Negeri Jakarta','Indonesia','15.00-15.10',''],
    ['Nathasa Pramudita Irianti','Sekolah Tinggi Pertanahan Nasional','Indonesia','15.10-15.20',''],
    ['Zakiya Amalia Hartanto Putri','Universitas Sultan Ageng Tirtayasa','Indonesia','15.20-15.30',''],
    ['Ayudya Fitriyani','Universitas Pendidikan Indonesia','Indonesia','15.30-15.40',''],
    ['Baharudin Yusuf Haqiqi','Universitas Pendidikan Indonesia','Indonesia','15.40-15.50',''],
    ['Hanifah Nurhayati','Universitas Pendidikan Indonesia','Indonesia','15.50-16.00',''],
    ['Rosiana Mufliva','Universitas Pendidikan Indonesia','Indonesia','16.00-16.10',''],
    ['Indah Frantia Sari','UNIVERSITAS SULTAN AGENG TIRTAYASA','Indonesia','16.10-16.20',''],
  ],
  'ROOM 6': [
    ['Sutirna','Universitas Singaperbangsa Karawang','Indonesia','13.40-13.50',''],
    ['Idayatul Mafuroh','SMA Negeri 7 Semarang','Indonesia','13.50-14.00',''],
    ['Diki Hermawan, Dina Ayu Setiani, And Fadhilah Nur Agustin','Universitas Muhammadiyah A. R. Fachruddin','Indonesia','14.00-14.10',''],
    ['Hikmawati Risa','Universitas Negeri Jakarta','Indonesia','14.10-14.20','online'],
    ['Suriaman','Universitas Pendidikan Indonesia','Indonesia','14.20-14.30',''],
    ['Dr. Rukminingsih, S.S., M.Pd.','PGRI Jombang University','Indonesia','14.30-14.40',''],
    ['Nia Oktavia','Universitas PGRI Wiranegara','Indonesia','14.40-14.50',''],
    ['Muhammad Faruq Wahyu Utomo','Universitas Sultan Ageng Tirtayasa','Indonesia','14.50-15.00',''],
    ['Trijaka Jaka','Universitas Terbuka','Indonesia','15.00-15.10',''],
    ['Siti Ulfah','Universitas Sultan Ageng Tirtayasa','Indonesia','15.10-15.20',''],
    ['Shiyin Zhang','The Open University of Sichuan','China','15.20-15.30',''],
    ['Iffah Fuadah','Universitas Terbuka','Indonesia','15.30-15.40',''],
    ['Deny Haryadi','University of Bengkulu','Indonesia','15.40-15.50',''],
    ['Lilik Ulfiati','Universitas Jambi','Indonesia','15.50-16.00',''],
    ['Putri Khairunnisa','Universitas Riau','Indonesia','16.00-16.10',''],
    ['Susanah','Universitas Jambi','Indonesia','16.10-16.20',''],
  ],
  'ROOM 7': [
    ['Nafri Yanti','Universitas Bengkulu','Indonesia','13.30-13.40','online'],
    ['Nunung Nurjanah','Institut Pangeran Dharma Kusuma','Indonesia','13.40-13.50',''],
    ['Maya Karmila S.E., M.E.','Universitas Terbuka','Indonesia','13.50-14.00',''],
    ['Muhammad Habib Ramadhani','University of Bengkulu','Indonesia','14.00-14.10',''],
    ['Ahmad Arifuddin','Universitas Sultan Ageng Tirtayasa','Indonesia','14.10-14.20',''],
    ['Ratu Asmaarobiyah','Terbuka University','Indonesia','14.20-14.30',''],
    ['Sylvia Sylvia','Universitas Terbuka','Indonesia','14.30-14.40',''],
    ['Zilzan Faqih Nur Rifqy','Universitas Pelita Bangsa','Indonesia','14.40-14.50',''],
    ['Bella Isnaeni','Universitas Pelita Bangsa','Indonesia','14.50-15.00',''],
    ['Rena Sulistianingsih','Universitas Pelita Bangsa','Indonesia','15.00-15.10',''],
    ['Yessa Afrilia','Universitas Pelita Bangsa','Indonesia','15.10-15.20',''],
    ['Nijma Adzkiya Ramadhani','Universitas Pelita Bangsa','Indonesia','15.20-15.30',''],
    ['Bimbi Anugrah','University of Riau','Indonesia','15.30-15.40',''],
    ['Juju Juwita','Universitas Pendidikan Indonesia','Indonesia','15.40-15.50',''],
    ['Ratna Sari','Universitas Bengkulu','Indonesia','15.50-16.00',''],
    ['Shofi Siti Nurjanah','Universitas Terbuka','Indonesia','16.00-16.10',''],
  ],
  'ROOM 8': [
    ['Rofik Salim','Universitas Pelita Bangsa','Indonesia','13.30-13.40','online'],
    ['Dwi Apriyanti','Universitas Pelita Bangsa','Indonesia','13.40-13.50',''],
    ['A Nidha Eka Restuti Munawir','UNIVERSITAS NEGERI SURABAYA','Indonesia','13.50-14.00',''],
    ['Aprilina Zulia Mirzana','MTs Negeri 8 Gunungkidul','Indonesia','14.00-14.10',''],
    ['Herawati','Universitas Pelita Bangsa','Indonesia','14.10-14.20',''],
    ['Pitri Ramadani','Universitas Pelita Bangsa','Indonesia','14.20-14.30',''],
    ['Sarah Sarah','Universitas Terbuka Serang','Indonesia','14.30-14.40',''],
    ['Siti Atiah','Universitas Terbuka Serang','Indonesia','14.40-14.50',''],
    ['Indah Permata Sari S.Pd','Universitas Negeri Medan','Indonesia','14.50-15.00',''],
    ['Muhamad Elfitra Salam','University of Indonesia','Indonesia','15.00-15.10',''],
    ['Muhammad Taufik','Universitas Indraprasta PGRI','Indonesia','15.10-15.20',''],
    ['Agung Olaf Ridho Rambe','University of North Sumatera','Indonesia','15.20-15.30',''],
    ['Nafri Yanti','Universitas Bengkulu','Indonesia','15.30-15.40',''],
    ['Hasanah Sulistiyah Ningsih','Universitas Sultan Ageng Tirtayasa','Indonesia','15.40-15.50',''],
    ['Anugrah Agung','Universitas Bengkulu','Indonesia','15.50-16.00',''],
  ],
  'ROOM 9': [
    ['Jiani Zhang','Sichuan Open University','China','13.30-13.40','online'],
    ['Rifaul Annisa','Universitas Pendidikan Indonesia','Indonesia','13.40-13.50',''],
    ['Melati','Universitas Jambi','Indonesia','13.50-14.00',''],
    ['Eny Cahyaningsih','Universitas Negeri Jakarta','Indonesia','14.00-14.10',''],
    ['Dyah Astriani','Universitas Negeri Surabaya','Indonesia','14.10-14.20',''],
    ['Nurul Qomariyah Ahmad','Universitas Negeri Jakarta','Indonesia','14.20-14.30',''],
    ['Nadya Els Silmy','UIN Palopo','Indonesia','14.30-14.40',''],
    ['Samsun','Universitas Negeri Jakarta','Indonesia','14.40-14.50',''],
    ['Harjoyo S.E., M.M.','Pamulang University','Indonesia','14.50-15.00',''],
    ['Ibrahim Radwan Ramadan','Al Quds Open University','Palestina','15.00-15.10',''],
    ['Aulyanissa Tsaqifa Maharshall','Universitas Sultan Ageng Tirtayasa','Indonesia','15.10-15.20',''],
    ['Fenno Farcis','Palangka Raya University','Indonesia','15.20-15.30',''],
    ['Dian Permatasari Kusuma Dayu','Universitas Negeri Surabaya','Indonesia','15.30-15.40',''],
    ['Daffa Fakhri Maulana','SMP Negeri 8 Yogyakarta','Indonesia','15.40-15.50',''],
    ['Adin Fauzi','Universitas Islam Balitar','Indonesia','15.50-16.00',''],
    ['Diana Anggraini','Universitas Negeri Jakarta','Indonesia','16.00-16.10',''],
  ],
  'ROOM 10': [
    ['Andi Wapa','Universitas Pendidikan Ganesha','Indonesia','13.30-13.40','online'],
    ['Lalu Awaludin Akbar','IAIH Pancor Lombok Timur','Indonesia','13.40-13.50',''],
    ['Dionisius Heckie Puspoko Jati','Satya Wacana Christian University','Indonesia','13.50-14.00',''],
    ['Hasan, Firmansyah Dlis, Yasep Setiakarnawijaya','State University of Jakarta','Indonesia','14.00-14.10',''],
    ['Na Imatul Izza Amalia, Mega Puspitasari, M.Pd.','Universitas Trunodjoyo Madura','Indonesia','14.10-14.20',''],
    ['Aisyah Aizza Junda','Universitas Pelita Bangsa','Indonesia','14.20-14.30',''],
    ['Deby Sekar Ayu','Universitas Pelita Bangsa','Indonesia','14.30-14.40',''],
    ['Luthfi Awwalia','Universitas Pembangunan Nasional Veteran Jawa Timur','Indonesia','14.40-14.50',''],
    ['Shinta Oktafiana, Yuliyana Sintiya, Saifi Abdiyah','Universitas Islam Negeri Madura','Indonesia','14.50-15.00',''],
    ['Mia Febriana','Universitas Sebelas Maret','Indonesia','15.00-15.10',''],
    ['Nina Nurani Putri','Universitas Pelita Bangsa','Indonesia','15.10-15.20',''],
    ['Diva Kartika Meilania, et al.','Universitas Pelita Bangsa','Indonesia','15.20-15.30',''],
    ['Yuli Amaliyah','Universitas Bengkulu','Indonesia','15.30-15.40',''],
    ['Dr. Irma Diani, M. Hum.','Universitas Bengkulu','Indonesia','15.40-15.50',''],
    ['Alda Wiharja, et al.','Universitas Pelita Bangsa','Indonesia','15.50-16.00',''],
    ['Devi Irviani Wulandari','Universitas Pelita Bangsa','Indonesia','16.00-16.10',''],
  ],
  'ROOM 11': [
    ['Putri Kirana','Universitas Pelita Bangsa','Indonesia','13.30-13.40','online'],
    ['Siti Jamilah','Universitas Pelita Bangsa','Indonesia','13.40-13.50',''],
    ['Triyadi','Universitas Sebelas Maret','Indonesia','13.50-14.00',''],
    ['Otto Trengginas Setiawan','National Research and Innovation Agency (BRIN)','Indonesia','14.00-14.10',''],
    ['Citra Cahyani','Universitas Pelita Bangsa','Indonesia','14.10-14.20',''],
    ['Dinda Qanita Nara','Universitas Pelita Bangsa','Indonesia','14.20-14.30',''],
    ['Andrisyah Andrisyah','IKIP Siliwangi','Indonesia','14.30-14.40',''],
    ['Nur Amaliyah Hanum','Universitas Terbuka dan STAI Salafiyah Bangil','Indonesia','14.40-14.50',''],
    ['Astrianingsih','Universitas Pelita Bangsa','Indonesia','14.50-15.00',''],
    ['Cony Kapitalia','Universitas Pelita Bangsa','Indonesia','15.00-15.10',''],
    ['Perawati Perawati','Universitas Riau','Indonesia','15.10-15.20',''],
    ['Dicky Cahya Nurfazri','Universitas Majalengka','Indonesia','15.20-15.30',''],
    ['Nurul Isra Fauziah','Universitas Terbuka','Indonesia','15.30-15.40',''],
  ],
  'ROOM 12': [
    ['Fitriyani Fitriyani','STKIP Kusuma Negara','Indonesia','13.30-13.40','online'],
    ['Agung Wijaksono','Sekolah Tinggi Agama Islam Nurul Huda','Indonesia','13.40-13.50',''],
    ['Alsadika Ziaul Haq','UIN Sunan Kalijaga','Indonesia','13.50-14.00',''],
    ['Dr. Juanda, S.S., M.Pd. / Sintia Wati Dewi','Universitas Samawa / Universitas Terbuka','Indonesia','14.00-14.10',''],
    ['Puan Helwa Rezha Soraya','Universitas Pendidikan Indonesia','Indonesia','14.10-14.20',''],
    ['Muhamad Rosadi','National Research and Innovation Agency / BRIN','Indonesia','14.20-14.30',''],
    ['Tanaya Salsabila','Universitas Pelita Bangsa','Indonesia','14.30-14.40',''],
    ['Serlita Nazwa Nilu','Universitas Pelita Bangsa','Indonesia','14.40-14.50',''],
    ['Maulidatur Rizkiah','Universitas Pelita Bangsa','Indonesia','14.50-15.00',''],
    ['Tiara Luthfi, S.Pd.','Universitas Terbuka','Indonesia','15.00-15.10',''],
    ['Astri Nuraeni S.Pd','Universitas Terbuka','Indonesia','15.10-15.20',''],
    ['Annissa Shafira Rajani Rahman','Universitas Terbuka','Indonesia','15.20-15.30',''],
    ['Ernie Novriyanti Novriyanti','Universitas Negeri Jakarta','Indonesia','15.30-15.40',''],
    ['Sarah Septiana Ningrum','UNIVERSITAS PELITA BANGSA','Indonesia','15.40-15.50',''],
    ['Nida Elsa Salsabila','Universitas Pelita Bangsa','Indonesia','15.50-16.00',''],
    ['Nanda Maharani Sukma','Universitas PGRI Mpu Sindok','Indonesia','16.00-16.10',''],
  ],
  'ROOM 13': [
    ['Noviansyah Kusmahardhika, M.Pd','National Taiwan Normal University / Universitas Negeri Malang','Indonesia','13.30-13.40',''],
    ['Nisrina Nurul Insani','Universitas Pendidikan Indonesia','Indonesia','13.40-13.50','online'],
    ['Mahfudz Reza Fahlevi','IAIN Syaikh Abdurrahman Siddik Bangka Belitung','Indonesia','13.50-14.00',''],
    ['Guntur Prasetyo Utomo','Universitas Negeri Surabaya','Indonesia','14.00-14.10',''],
    ['Mohammad Sholikhin, Mega Puspitasari','Universitas Trunodjoyo Madura','Indonesia','14.10-14.20',''],
    ['Gemala Ranti','UNIVERSITAS NEGERI JAKARTA','Indonesia','14.20-14.30',''],
    ['Ahmad Nasir Ari Bowo','Universitas Cokroaminoto Yogyakarta','Indonesia','14.30-14.40',''],
    ['Ajeng Tri Agustini','Universitas Pendidikan Indonesia','Indonesia','14.40-14.50',''],
    ['Ikhwan Abduh','Universitas Negeri Jakarta','Indonesia','14.50-15.00',''],
    ['Delilla Lizahra, S.Pd.','Universitas Terbuka','Indonesia','15.00-15.10',''],
    ['Muhammad Abdhi Assolah','Universitas Terbuka','Indonesia','15.10-15.20',''],
    ['Adnia Rianti Pradita','Universitas Terbuka','Indonesia','15.20-15.30',''],
    ['Muhamad Ikhsan, S.Pd.','Universitas Terbuka','Indonesia','15.30-15.40',''],
    ['Leonard Raden Hutasoit, et al.','Universitas Terbuka','Indonesia','15.40-15.50',''],
  ],
  'ROOM 14': [
    ['Syifa Nur Shadrina','Universitas Pendidikan Indonesia','Indonesia','13.30-13.40','online'],
    ['Aulia Urohmah','Universitas Sultan Ageng Tirtayasa (Untirta)','Indonesia','13.40-13.50',''],
    ['Ratu Asmaarobiyah','Sultan Ageng Tirtayasa University','Indonesia','13.50-14.00',''],
    ['Yayang Karlina','Universitas Pendidikan Indonesia','Indonesia','14.00-14.10',''],
    ['Rini Solihat','UPI','Indonesia','14.10-14.20',''],
    ['Siti Zahrotun','Sultan Ageng Tirtayasa University','Indonesia','14.20-14.30',''],
    ['Yuliyanti Yuliyanti','Universitas Sultan Ageng Tirtayasa','Indonesia','14.30-14.40',''],
    ['Puput Delia Indriani','Universitas Negeri Jakarta','Indonesia','14.40-14.50',''],
    ['Aam Amalia','Sultan Ageng Tirtayasa University','Indonesia','14.50-15.00',''],
    ['Neza Agusdianita','University of Bengkulu','Indonesia','15.00-15.10',''],
    ['Marzuki','Universitas Almuslim','Indonesia','15.10-15.20',''],
    ['Debi Heryanto','University of Bengkulu','Indonesia','15.20-15.30',''],
    ['Yusnia Yusnia','University of Bengkulu','Indonesia','15.30-15.40',''],
    ['Wisnu Juli Wiono','University of Lampung','Indonesia','15.40-15.50',''],
    ['Heny Wijaya','Universitas Sultan Ageng Tirtayasa','Indonesia','15.50-16.00',''],
    ['Syafira Defni','Universitas Pendidikan Indonesia','Indonesia','16.00-16.10',''],
  ],
  'ROOM 15': [
    ['Vania Zulfa','Universitas Negeri Jakarta','Indonesia','13.30-13.40','online'],
    ['Vivi Khoerunnissa','Universitas Pelita Bangsa','Indonesia','13.40-13.50',''],
    ['Trias Wibiwirutami','Universitas Pelita Bangsa','Indonesia','13.50-14.00',''],
    ['Dewi Laras Tuti','Universitas Pelita Bangsa','Indonesia','14.00-14.10',''],
    ['Luthfiah Aulia Nurul Akmal','Universitas Pelita Bangsa','Indonesia','14.10-14.20',''],
    ['Holifah','Universitas Pelita Bangsa','Indonesia','14.20-14.30',''],
    ['Natashia Margaretha Sihombing','Universitas Pelita Bangsa','Indonesia','14.30-14.40',''],
    ['Heny Oktavia','Universitas Pelita Bangsa','Indonesia','14.40-14.50',''],
    ['Shofy Hakimah','UNIVERSITAS TERBUKA','Indonesia','14.50-15.00',''],
    ['Laala Hilda Faujiyah / Siti Fadilah','Universitas Terbuka Serang','Indonesia','15.00-15.10',''],
    ['Dodi Lesmana, Mira Amelia Amri, Puryati','Universitas Negeri Jakarta','Indonesia','15.10-15.20',''],
    ['Yofran Hengki Ndoluanak, Muchlas Suseno, Ahmad Ridwan','Universitas Negeri Jakarta','Indonesia','15.20-15.30',''],
  ],
  'ROOM 16': [
    ['Yunisa Sapphira Titalia','Universitas Pendidikan Indonesia','Indonesia','13.30-13.40','online'],
    ['Sheryl Mutiara Putri','Universitas Negeri Jakarta','Indonesia','13.40-13.50',''],
    ['Marito Evinoel Sambur','Universitas Negeri Medan (UNIMED)','Indonesia','13.50-14.00',''],
    ['Rida Anastasia Nasution, S.Pd, Gr','Universitas Negeri Medan','Indonesia','14.00-14.10',''],
    ['Hanif Roihan Fikri','Universitas Sultan Ageng Tirtayasa','Indonesia','14.10-14.20',''],
    ['Adinda Asri Ramadhanti','Universitas Bengkulu','Indonesia','14.20-14.30',''],
    ['Marwan Maulana, Novi Ramdhani, Luthpin Ubaidiah','Universitas Terbuka','Indonesia','14.30-14.40',''],
    ['Rena Nuralia','Universitas Sultan Ageng Tirtayasa','Indonesia','14.40-14.50',''],
    ['An Nuril Maulida Fauziah','Universitas Negeri Surabaya','Indonesia','14.50-15.00',''],
    ['Lena Amelia','Universitas Terbuka','Indonesia','15.00-15.10',''],
    ['Anggita Maritsha','Universitas Riau','Indonesia','15.10-15.20',''],
    ['Reni Chintya Putri Sirait','Universitas Riau','Indonesia','15.20-15.30',''],
  ],
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection("googlesheets");
    const body = await req.json().catch(() => ({}));
    const targetRoom = body.room;

    const roomsToUpdate = targetRoom ? [targetRoom] : Object.keys(ROOM_HEADERS);
    const results = [];

    for (const room of roomsToUpdate) {
      const header = ROOM_HEADERS[room];
      const participants = ROOM_PARTICIPANTS[room] || [];

      if (!header) {
        results.push({ room, status: 'skipped', reason: 'no header data' });
        continue;
      }

      // First, clear old participant data (rows 8-30) to avoid stale data
      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(room + '!A8:K30')}:clear`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        }
      );

      const valueRanges = [
        { range: `${room}!C3`, values: [[header.invitedSpeaker]] },
        { range: `${room}!C4`, values: [[header.moderator]] },
        { range: `${room}!C5`, values: [[header.it]] },
      ];

      // Participant rows from row 9 onwards (row 7=col header, row 8=sub-header scores)
      participants.forEach((p, i) => {
        const rowNum = 9 + i;
        const isOnline = p[4] && p[4].toLowerCase().includes('online');
        const displayName = isOnline ? `${p[0]} 🔴` : p[0];
        valueRanges.push({
          range: `${room}!A${rowNum}:E${rowNum}`,
          values: [[i + 1, '', displayName, p[1], p[2]]]
        });
      });

      const updateRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchUpdate`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            valueInputOption: 'USER_ENTERED',
            data: valueRanges,
          }),
        }
      );

      const result = await updateRes.json();
      if (result.error) {
        results.push({ room, status: 'error', reason: result.error.message });
      } else {
        results.push({ room, status: 'ok', updatedCells: result.totalUpdatedCells });
      }
    }

    return Response.json({ success: true, results });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});