import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SPREADSHEET_ID = '1yLIYFFDKjoL8ZearUiRf9B1HUnHlsl3voZmsQw9IN5M';

// Data dari sheet 'Pengisi' - moderator, IT, dan invited speaker per room
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

// Data peserta per room (name, institution, country, jadwal, type, judul)
const ROOM_PARTICIPANTS = {
  'ROOM 1': [
    ['Kamariah Kamariah','Universitas PGRI Kalimantan','Indonesia','13.40-13.50','','AI SUPPORTED LITERACY AND NUMERACY LEARNING: A SYSTEMATIC REVIEW FOR SDGs'],
    ['Yoseph Satria Praka','Politeknik Negeri Jakarta','Indonesia','13.50-14.00','online','EXPLORING THE ACCURACY AND USABILITY OF AI-GENERATED IMAGES FOR ABSTRACT PHYSICS CONCEPTS IN EDUCATION'],
    ['Tarina Nurul Lieza','Universitas Pendidikan Indonesia','Indonesia','14.00-14.10','','ASSESSING THE IMPACT OF TECHNOLOGY-SUPPORTED PEDAGOGICAL INNOVATION ON STUDENT SUSTAINABLE DEVELOPMENT AWARENESS'],
    ['Rizqa Dwi Shofiya Maghfira Izzania','Universitas Bengkulu','Indonesia','14.10-14.20','','Identification of Ethnoscience Potential and GenAI Technology in Disaster Mitigation Learning'],
    ['Hastangka','BRIN (National Research and Innovation Agency) - Indonesia','Indonesia','14.20-14.30','','Reimagining Civic Education through AI-Supported Blended Learning in Indonesia'],
    ['Novasa Adiyani','Politeknik Jatiluhur','Indonesia','14.30-14.40','','Exploring Tourism Students Perceptions of ChatGPT in English Language Learning'],
    ['Sopa Marwah','Universitas Garut','Indonesia','14.40-14.50','','Exploring the Use of Artificial Intelligence in Learning: A Phenomenological Study'],
    ['Rizky Agassy Sihombing, M.Pd., M.S.','Universitas Pendidikan Indonesia and National Taiwan Normal University','Indonesia','14.50-15.00','','Artificial Intelligence in Science Education for Sustainability: A Systematic Review'],
    ['Yousef Mohammad Iriqat','Al-Quds Open University','Palestina','15.00-15.10','','Artificial Intelligence Adoption in Higher Education: A Mediation-Based Conceptual Framework'],
    ['Della Gita Van Gobel','IAKN Palangka Raya','Indonesia','15.10-15.20','','CHATGPT VS ACADEMIC SOURCES IN INDONESIAN CHURCH HISTORY LEARNING FOR CRITICAL THINKING'],
    ['Suryanti','Universitas Muhammadiyah Buton','Indonesia','15.20-15.30','','TRANSFORMING INDONESIAN LANGUAGE LEARNING IN HIGHER EDUCATION THROUGH AI ASSISTED PEDAGOGY'],
    ['Tyas Prayesti','STIKes Bina Putera Banjar','Indonesia','15.30-15.40','','Islamic Religious Education as a Foundation for Ethical AI Use Among Indonesian Youth'],
    ['Tri Gunadi, Amd. Ot., S.Ked., S.Psi., Psikolog','Universitas Indonesia','Indonesia','15.40-15.50','','Enhancing Student Engagement and Emotional Regulation in ASD through Technology-Enhanced UDL'],
    ['Fanissa Narita','Politeknik Jatiluhur','Indonesia','15.50-16.00','','The Impact of Artificial Intelligence on EFL Learning: A Systematic Review'],
  ],
  'ROOM 2': [
    ['Sendi Ramdhani','Universitas Terbuka','Indonesia','13.40-13.50','','AI-Scaffolding and Neuropedagogy in Elementary Mathematics: A Scoping Review'],
    ['Ronald Hervin Haloho','Universitas Negeri Medan','Indonesia','13.50-14.00','','AI-ASSISTED PROJECT-BASED LEARNING: DEVELOPING DIGITAL ENTREPRENEURIAL MINDSET AMONG VOCATIONAL STUDENTS'],
    ['Dwi Fitra Arreski','Universitas Terbuka','Indonesia','14.00-14.10','','Rethinking Assessment in Accounting Education amid Generative AI'],
    ['Rizky Wardhani','Universitas Negeri Jakarta','Indonesia','14.10-14.20','','Integrating Somatic Methods through Hand Kinesthetic Activities to Enhance Chinese Listening Efficacy'],
    ['Rizky Wardhani','Universitas Negeri Jakarta','Indonesia','14.20-14.30','','Optimizing AI Text-to-Speech in the Development of Interactive Chinese Learning Media'],
    ['Muhammad Aryuda Silfa','Universitas Terbuka','Indonesia','14.30-14.40','','Enhancing Student Engagement and Academic Performance through AI-Based Adaptive Learning Systems'],
    ['Cindy Azzahra','Universitas Pelita Bangsa','Indonesia','14.40-14.50','','ANALYSIS OF TEACHERS PERCEPTIONS OF THE LIMITATIONS OF LEARNING MEDIA AND THEIR IMPACT ON EFFECTIVENESS'],
    ['Adhi Susilo','Universitas Terbuka','Indonesia','14.50-15.00','','The Impact of Artificial Intelligence On Students Thinking Skills In Indonesian Higher Education'],
    ['Jie Peng','The Open University of Yaan','China','15.00-15.10','online','Research on the Transformation and Effect of Lifelong Learning Methods Supported by AI'],
    ['Dina Dahliana','STAI Solok Nan Indah','Indonesia','15.10-15.20','','LEVERAGING ARTIFICIAL INTELLIGENCE FOR LEARNING ANALYTICS-DRIVEN PERSONALIZED LEARNING'],
    ['Sherly Anisa Utami','Terbuka University','Indonesia','15.20-15.30','','Designing AI-Supported Ipas Learning With Canva For Cultural Diversity Education In Elementary Schools'],
    ['Elsya Fitriani Nuraziziah Utami','Universitas Pendidikan Indonesia','Indonesia','15.30-15.40','','ENHANCING UNDERSTANDING OF LOCAL WISDOM AND SOCIAL ISSUES THROUGH AI AND EDUCATIONAL APPLICATIONS'],
    ['Arum Putri Rahayu','STAI Maarif Magetan','Indonesia','15.40-15.50','','Cybergogy and Multiliteracy in AI-Mediated Academic English: A Conceptual Study in Islamic Higher Education'],
    ['Sutarsih Sutarsih','Badan Riset dan Inovasi Nasional','Indonesia','15.50-16.00','','THE USE OF ARTIFICIAL INTELLIGENCE (AI) IN LANGUAGE LEARNING'],
  ],
  'ROOM 3': [
    ['Ani Mariani','Universitas Negeri Jakarta','Indonesia','13.40-13.50','','Development of a Website-Based Interactive E-Module to Improve Biology Students Conceptual Understanding'],
    ['Sitisamsiyah Samsiyah','Universitas Terbuka','Indonesia','13.50-14.00','','How to Enhance Adult Self-regulated Learning Behavior in a Blended Learning Environment'],
    ['Anthony A. Salim','Universitas Negeri Jakarta','Indonesia','14.00-14.10','','DEVELOPMENT OF ECONOMICS SUBJECT LEARNING MODEL USING PjBL-BASED LMS FOR HIGH SCHOOL'],
    ['Etika Khaerunnisa','Universitas Sultan Ageng Tirtayasa','Indonesia','14.10-14.20','','Learning Management Systems and Cognitive Load: Mapping Research Trends and Future Directions'],
    ['Mayasari Manar, M.Pd','Universitas Negeri Jakarta','Indonesia','14.20-14.30','','Communication Experiences of Students with Hearing Impairments in Online and Offline Learning'],
    ['Masmuhah Masmuhah','Alif Iqra','Indonesia','14.30-14.40','','Challenges and Solutions in Blended Quran Learning for Children'],
    ['Wijanarko Wijanarko','Universitas Terbuka','Indonesia','14.40-14.50','','The Relationship of Distance Learning Skills Training in Growing Learning Motivation'],
    ['Munaya Nikma Rosyada','Universitas Islam Internasional Indonesia','Indonesia','14.50-15.00','','Proposing Instructional Design using iPad Technology based on Universal Design of Learning (UDL) Framework'],
    ['Nofi Maria Krisnawati','Universitas Islam Internasional Indonesia','Indonesia','15.00-15.10','','INSTRUCTIONAL DESIGN FOR SCIENCE EDUCATION: INTEGRATING SCIENTIFIC APPROACH AND TASK-BASED LEARNING'],
    ['Yasir Riady','Universitas Terbuka','Indonesia','15.10-15.20','','Empowering Communities Through Literacy: The Role of Gresik District Library'],
    ['Jingyi Zhong','The Open University of Sichuan','China','15.20-15.30','Online','Blended Project-based CLIL in Open University International Education: An AI-Enabled Management Case Study'],
    ['Holten Sion','Universitas Palangka Raya','Indonesia','15.30-15.40','','BLENDED LEARNING FOR STRESS RESISTANCE ENHANCEMENT IN TEACHER PROFESSIONAL EDUCATION'],
    ['Radiatan Mardiah And Melati','Universitas Jambi','Indonesia','15.40-15.50','','GOOGLE DOCS FOR TEACHER PROFESSIONAL DEVELOPMENT: ENGAGING STUDENTS IN COLLABORATIVE LEARNING'],
    ['Ayu Ambarwati','TK NEGERI SATU ATAP PANDANSARI NGUNUT TULUNGAGUNG','Indonesia','15.50-16.00','','Implementing IFP-Based Joyfull Interactive Games In Teaching Early Literacy Vowel Skills'],
  ],
  'ROOM 4': [
    ['Waway Qodratulloh S','Politeknik Negeri Bandung','Indonesia','13.40-13.50','','Technology-Enhanced Ethnopedagogy: Recontextualizing Folklore for Islamic Character Education toward SDG 4.7'],
    ['Tetin Nurfitri','STAI Al Hidayah Tasikmalaya','Indonesia','13.50-14.00','','NURTURING EARLY CHILDHOOD CHARACTER THROUGH INDIGENOUS WISDOM IN KAMPUNG NAGA'],
    ['Santi Nisfi Anggraeni','STAI Al Hidayah Tasikmalaya','Indonesia','14.00-14.10','Offline','SOCIO-CULTURAL ECOSYSTEMS: ETHNOPEDAGOGICAL PERSPECTIVES ON EARLY CHILDHOOD SOCIALITY IN KAMPUNG NAGA'],
    ['Iis Sintiani','STAI Al Hidayah Tasikmalaya','Indonesia','14.10-14.20','','ETHNOPEDAGOGICAL MANIFESTATION: TRADITION-BASED PARENTING PATTERNS IN EARLY CHILDHOOD KAMPUNG NAGA TASIKMALAYA'],
    ['Jackson Pasini Mairing','Universitas Palangka Raya','Indonesia','14.20-14.30','','Ethnomathematics learning: A hybrid systematic literature review and bibliometric analysis'],
    ['Imam Syafii','Universitas Terbuka','Indonesia','14.30-14.40','','The Practice of Implementing Wasathiyah Islam in the Modern Academic Ecosystem: A Bibliometric Analysis'],
    ['M Dahlan R','Universitas Muhammadiyah Tangerang','Indonesia','14.40-14.50','Online','RECONSTRUCTION OF ISLAMIC EDUCATION THROUGH TECHNOLOGY-BASED PEDAGOGICAL INNOVATION FOR SUSTAINABLE DEVELOPMENT'],
    ['Sun Hua','SiChuan Open University','China','14.50-15.00','','Negotiating Tradition and Modernity: A Grounded Theory Study of Cultural Adaptation in Ethnic Minority Families'],
    ['Muhamad Affandi','Universitas Palangka Raya','Indonesia','15.00-15.10','','ETHNOPEDAGOGICAL PROJECT BASED LEARNING FOR SOCIAL ENTREPRENEURSHIP AND SUSTAINABLE DEVELOPMENT'],
    ['Ryan Prayogi','Universitas Pendidikan Indonesia','Indonesia','15.10-15.20','','EXPLORING LIVING VALUES EDUCATION IN TUNJUK AJAR MELAYU'],
    ['I Wayan Rudiarta','Ganesha University of Education','Indonesia','15.20-15.30','','Tri Hita Karana as a Basis for Ethnopedagogy in Hindu Religious Education for Sustainable Development Goals'],
    ['Desvi Wahyuni','University of Bengkulu','Indonesia','15.30-15.40','','Integrating Bengkulu Traditional Games into Technology-Enhanced Early Childhood Learning'],
    ['Ifat Fatimah Zahro','Universitas Negeri Jakarta (UNJ)','Indonesia','15.40-15.50','','PRELIMINARY STUDY OF ETHNOPEDAGOGY-BASED LEARNING FOR MARITIME CULTURAL LITERACY IN EARLY CHILDHOOD'],
    ['Kurroti Ayun','IAI UW Jombang','Indonesia','15.50-16.00','','LEARNING TRANSFORMATION THROUGH COLLABORATION BETWEEN VARIOUS GENERAL LESSONS AND FAITH'],
    ['Ani Siti Anisah','Universitas Garut','Indonesia','16.00-16.10','','FROM LOCAL WISDOM TO THE CLASSROOM: INTERNALIZING THE ECOTHEOLOGICAL VALUES OF THE KAMPUNG NAGA INDIGENOUS COMMUNITY'],
    ['Mohamad Arif Rahmansyah','Universitas Terbuka','Indonesia','16.10-16.20','','Reinventing Professional Development Program to Equip Teachers with Culturally-Rooted Teaching Material Development Skills'],
  ],
  'ROOM 5': [
    ['Indah Purnama Dewi, Mansyur Srisudarso, Tedi Purbangkara','Universitas Singaperbangsa Karawang','Indonesia','13.40-13.50','','DEVELOPING AN INNOVATIVE TECHNOLOGY-BASED PEDAGOGICAL MODEL IN THE EDUCATION PROFESSION TO SUPPORT THE SDGs'],
    ['Reni Tarmini','Universitas Terbuka','Indonesia','13.50-14.00','','THE EFFECT OF THE CONTEXTUAL TEACHING AND LEARNING APPROACH ON ELEMENTARY SCHOOL STUDENTS MATHEMATICAL COMPREHENSION SKILLS'],
    ['Nia Jusniani','Universitas Terbuka','Indonesia','14.00-14.10','Online','Comparative Study of GeoGebra-Based Learning and Physical Manipulatives on Students Conceptual Understanding'],
    ['Sugama Maskar','Universitas Pendidikan Indonesia','Indonesia','14.10-14.20','','A Role-Playing Serious Game-Based Mathematics Learning Environment'],
    ['Gayatria Oktalina','Universitas Terbuka','Indonesia','14.20-14.30','','THE EFFECTIVENESS OF MIND MAPPING IN ENHANCING STUDENTS INTEREST IN ECONOMICS LEARNING'],
    ['A A Musyaffa Musyaffa','Universitas Islam Negeri Sulthan Thaha Saifuddin Jambi','Indonesia','14.30-14.40','','Transforming Primary Education through Technology-Enhanced Pedagogy to Support Sustainable Development Goals'],
    ['Dida Firgiawan','SMA Negeri 8 Bandung / Universitas Pendidikan Indonesia','Indonesia','14.40-14.50','','Developing STEM Literacy through Interdisciplinary STEM-ESD Learning'],
    ['Yayuk Hidayah, Nathasa Pramudita Irianti, Rr. Yudiswara Ayu Permatasari','Universitas Negeri Yogyakarta','Indonesia','14.50-15.00','','Computational Thinking and the Development of Civic Reasoning in Civic Education'],
    ['Stephanus Turibius Rahmat','Universitas Negeri Jakarta','Indonesia','15.00-15.10','','Conceptual Framework for Developing a Receptive and Expressive Language Learning Model for Early Childhood'],
    ['Nathasa Pramudita Irianti','Sekolah Tinggi Pertanahan Nasional','Indonesia','15.10-15.20','','Integration of STEM Approach on Mathematic Learning in Higher Education'],
    ['Zakiya Amalia Hartanto Putri','Universitas Sultan Ageng Tirtayasa','Indonesia','15.20-15.30','','WORKED EXAMPLES IN MATHEMATICS LEARNING: A SYSTEMATIC LITERATURE REVIEW'],
    ['Ayudya Fitriyani','Universitas Pendidikan Indonesia','Indonesia','15.30-15.40','','Fostering Student Action for Clean Water and Sanitation (SDG-6) Through Project-Based STEM-ESD Learning'],
    ['Baharudin Yusuf Haqiqi','Universitas Pendidikan Indonesia','Indonesia','15.40-15.50','','Mapping Differences in Students Knowledge and Perspectives on Climate Change Mitigation and Adaptation'],
    ['Hanifah Nurhayati','Universitas Pendidikan Indonesia','Indonesia','15.50-16.00','','The Effect of Integrating Science Text Cards, KWL Charts, and Visual Cues on Middle School Students Critical Thinking Skills'],
    ['Rosiana Mufliva','Universitas Pendidikan Indonesia','Indonesia','16.00-16.10','','Developing a STEAM-Based Mathematics Learning Model with Digital Technology'],
    ['Indah Frantia Sari','UNIVERSITAS SULTAN AGENG TIRTAYASA','Indonesia','16.10-16.20','','Pedagogical Innovations in Enhancing Students Mathematical Reflective Thinking: A Systematic Literature Review'],
  ],
  'ROOM 6': [
    ['Sutirna','Universitas Singaperbangsa Karawang','Indonesia','13.40-13.50','','LEARNING THROUGH MOTIVATIONAL VIDEO SHOWS IN REINFORCEMENT OF THE IMPORTANCE OF GUIDANCE AND COUNSELING COURSES'],
    ['Idayatul Mafuroh','SMA Negeri 7 Semarang','Indonesia','13.50-14.00','','Technological Innovation for Strengthening in Double Track Entrepreneurship Programs'],
    ['Diki Hermawan, Dina Ayu Setiani, And Fadhilah Nur Agustin','Universitas Muhammadiyah A. R. Fachruddin','Indonesia','14.00-14.10','','DESIGNING A DATA-INFORMED AND DISTRIBUTED LEADERSHIP-BASED ELEMENTARY SCHOOL COUNSELING MANAGEMENT MODEL'],
    ['Hikmawati Risa','Universitas Negeri Jakarta','Indonesia','14.10-14.20','Online','MAPPING RESEARCH ON REFLECTIVE PRACTICE AND STUDENT MENTAL HEALTH: A BIBLIOMETRIC ANALYSIS (2015-2025)'],
    ['Suriaman','Universitas Pendidikan Indonesia','Indonesia','14.20-14.30','','DIGITAL HEALTH AND WELLNESS AS A DIMENSION OF DIGITAL CITIZENSHIP: A CIVIC EDUCATION PERSPECTIVE'],
    ['Dr. Rukminingsih, S.S., M.Pd.','PGRI Jombang University','Indonesia','14.30-14.40','','NEUROEDUCATION STRATEGIES FOR MANAGING MIXED-ABILITY EFL CLASSROOMS AND ENHANCING STUDENT WELL-BEING'],
    ['Nia Oktavia','Universitas PGRI Wiranegara','Indonesia','14.40-14.50','','PRINCIPAL LEADERSHIP IN MANAGING INCLUSIVE EDUCATION AT MI MIFTAHUL HUDA GADINGREJO'],
    ['Muhammad Faruq Wahyu Utomo','Universitas Sultan Ageng Tirtayasa','Indonesia','14.50-15.00','','Designing the Adversity Response Profile Instrument to Measure Students Adversity Quotient'],
    ['Trijaka Jaka','Universitas Terbuka','Indonesia','15.00-15.10','','PANCASILA CHARACTER EDUCATION TO OVERCOME DELINQUENCY IN SCHOOL-AGE CHILDREN'],
    ['Siti Ulfah','Universitas Sultan Ageng Tirtayasa','Indonesia','15.10-15.20','','Interrelationship Between Mathematical Resilience and Mathematical Creative Thinking: A Systematic Literature Review'],
    ['Shiyin Zhang','The Open University of Sichuan','China','15.20-15.30','','Physical Activity and Adolescents Learning Engagement: Parallel Mediation via Cognitive Reappraisal'],
    ['Iffah Fuadah','Universitas Terbuka','Indonesia','15.30-15.40','','Academic Engagement of Students with Autism Spectrum Disorder in Inclusive Education: A Systematic Literature Review'],
    ['Deny Haryadi','University of Bengkulu','Indonesia','15.40-15.50','','Managing Childrens Character Development in the Digital Era: Parenting, Digital Literacy, and Peer Influence'],
    ['Lilik Ulfiati','Universitas Jambi','Indonesia','15.50-16.00','','Feedback Literacy as Autonomy Scaffolding: Indonesian EFL Writing Instructors Practices'],
    ['Putri Khairunnisa','Universitas Riau','Indonesia','16.00-16.10','','THE ROLE OF COUNSELING IN MANAGING ACADEMIC STRESS AND IMPROVING COLLEGE STUDENTS WELL-BEING'],
    ['Susanah','Universitas Jambi','Indonesia','16.10-16.20','','Feedback Literacy as Autonomy Scaffolding: Indonesian EFL Writing Instructors Practices'],
  ],
  'ROOM 7': [
    ['Nafri Yanti','Universitas Bengkulu','Indonesia','13.30-13.40','Online','EXPLORING THE NOTEBOOKLM PLATFORM AS A VARIED TEACHING MATERIAL IN INDONESIAN LANGUAGE LEARNING'],
    ['Nunung Nurjanah','Institut Pangeran Dharma Kusuma','Indonesia','13.40-13.50','','THE URGENCY OF USING DIGITAL LEARNING MEDIA WITH A GENDER EQUALITY PERSPECTIVE FOR GENERATION Z'],
    ['Maya Karmila S.E., M.E.','Universitas Terbuka','Indonesia','13.50-14.00','','EXAMINING GENERATIVE AI USE IN HIGHER EDUCATION: LEARNING EFFICIENCY AND TECHNOLOGY DEPENDENCE'],
    ['Muhammad Habib Ramadhani','University of Bengkulu','Indonesia','14.00-14.10','','A Critical Analysis of Students Use of ChatGPT in Completing Mathematics Assignments'],
    ['Ahmad Arifuddin','Universitas Sultan Ageng Tirtayasa','Indonesia','14.10-14.20','','The Effectiveness of AI-Enhanced Web-Based Interactive Learning Media in Improving Numeracy Skills'],
    ['Ratu Asmaarobiyah','Terbuka University','Indonesia','14.20-14.30','','DESIGNING AI-SUPPORTED IPAS LEARNING WITH CANVA FOR CULTURAL DIVERSITY EDUCATION IN ELEMENTARY SCHOOLS'],
    ['Sylvia Sylvia','Universitas Terbuka','Indonesia','14.30-14.40','','A SYSTEMATIC LITERATURE REVIEW OF TECHNOLOGY-ENHANCED MULTIMODAL COMPOSITION IN EFL CONTEXTS'],
    ['Zilzan Faqih Nur Rifqy','Universitas Pelita Bangsa','Indonesia','14.40-14.50','','TEACHERS NEEDS ANALYSIS IN USING SMART BOARDS AS LEARNING MEDIA IN ELEMENTARY SCHOOLS'],
    ['Bella Isnaeni','Universitas Pelita Bangsa','Indonesia','14.50-15.00','','An Analysis of Elementary School Teachers Perceptions and Readiness Levels in Integrating AI Into their Teaching'],
    ['Rena Sulistianingsih','Universitas Pelita Bangsa','Indonesia','15.00-15.10','','Analysis of Teachers Perceptions of Student Activeness in Learning after Using the Quizizz Application'],
    ['Yessa Afrilia','Universitas Pelita Bangsa','Indonesia','15.10-15.20','','TEACHERS READINESS LEVEL IN USING INTERACTIVE DIGITAL WHITEBOARDS IN ELEMENTARY SCHOOLS'],
    ['Nijma Adzkiya Ramadhani','Universitas Pelita Bangsa','Indonesia','15.20-15.30','','TEACHERS PERCEPTIONS OF THE USE OF INTERACTIVE FLAT PANELS (IFPs) AS A LEARNING MEDIUM IN ELEMENTARY SCHOOLS'],
    ['Bimbi Anugrah','University of Riau','Indonesia','15.30-15.40','','DIGITAL PEDAGOGICAL TRANSFORMATION THROUGH ARTIFICIAL INTELLIGENCE: OPPORTUNITIES AND IMPLICATIONS IN LEARNING'],
    ['Juju Juwita','Universitas Pendidikan Indonesia','Indonesia','15.40-15.50','','Generative AI-Integrated Inquiry-Based Learning: A Preliminary Study on Science Data Literacy in Biology Learning'],
    ['Ratna Sari','Universitas Bengkulu','Indonesia','15.50-16.00','','UTILIZATION AI IN THE EFFECTIVENESS INDONESIAN LANGUAGE COURSE AMONG PGSD UNIVERSITY OF BENGKULU'],
    ['Shofi Siti Nurjanah','Universitas Terbuka','Indonesia','16.00-16.10','','Digital Literacy For Elementary School Students In The Artificial Intelligence Era'],
  ],
  'ROOM 8': [
    ['Rofik Salim','Universitas Pelita Bangsa','Indonesia','13.30-13.40','Online','AN ANALYSIS OF ELEMENTARY SCHOOL TEACHERS READINESS TO INTEGRATE CANVA AS A DIGITAL LEARNING TOOL'],
    ['Dwi Apriyanti','Universitas Pelita Bangsa','Indonesia','13.40-13.50','','THE IMPACT OF THE DEEP LEARNING PROCESS IN DEVELOPING 21ST CENTURY STUDENTS COMMUNICATION SKILL'],
    ['A Nidha Eka Restuti Munawir','UNIVERSITAS NEGERI SURABAYA','Indonesia','13.50-14.00','','The Emergence of AI Literacy in Early Childhood Education: A Bibliometric Analysis and Future Research Agenda'],
    ['Aprilina Zulia Mirzana','MTs Negeri 8 Gunungkidul','Indonesia','14.00-14.10','','Trends in the Use of Artificial Intelligence in Teaching Among Teachers at State Islamic Junior High Schools'],
    ['Herawati','Universitas Pelita Bangsa','Indonesia','14.10-14.20','','ANALYSIS OF ELEMENTARY SCHOOL TEACHERS NEEDS FOR TRAINING TO IMPROVE DIGITAL LITERACY'],
    ['Pitri Ramadani','Universitas Pelita Bangsa','Indonesia','14.20-14.30','','Needs Analysis of Elementary School Teachers in Utilizing the Quizizz Application'],
    ['Sarah Sarah','Universitas Terbuka Serang','Indonesia','14.30-14.40','','THE USE OF CLAUDE AI TO IMPROVE PRE-SERVICE TEACHERS ABILITY IN DESIGNING TEACHING MODULES'],
    ['Siti Atiah','Universitas Terbuka Serang','Indonesia','14.40-14.50','','THE USE OF CLAUDE AI TO IMPROVE PRE-SERVICE TEACHERS ABILITY IN DESIGNING TEACHING MODULES'],
    ['Indah Permata Sari S.Pd','Universitas Negeri Medan','Indonesia','14.50-15.00','','Students Responses To Development Of Chemistry Teaching Media Based On Chemo-edutainment Integrated With AI'],
    ['Muhamad Elfitra Salam','University of Indonesia','Indonesia','15.00-15.10','','FROM KNOWLEDGE TO PRACTICE: FOUNDATIONAL SCIENCES AND CLINICAL REASONING IN PHYSIOTHERAPY STUDENTS'],
    ['Muhammad Taufik','Universitas Indraprasta PGRI','Indonesia','15.10-15.20','','EFL Students Perceptions of Using AI Chatbots in Learning Speaking Skills'],
    ['Agung Olaf Ridho Rambe','University of North Sumatera','Indonesia','15.20-15.30','','FROM TRADITIONAL TO DIGITAL: PEDAGOGICAL INNOVATION IN ACHIEVING SUSTAINABLE DEVELOPMENT GOAL 4'],
    ['Nafri Yanti','Universitas Bengkulu','Indonesia','15.30-15.40','','EXPLORING THE NOTEBOOKLM PLATFORM AS A VARIED TEACHING MATERIAL IN INDONESIAN LANGUAGE LEARNING'],
    ['Hasanah Sulistiyah Ningsih','Universitas Sultan Ageng Tirtayasa','Indonesia','15.40-15.50','','Enhancing Mathematics Learning through AI Chatbots and Scaffolding: A Systematic Literature Review'],
    ['Anugrah Agung','Universitas Bengkulu','Indonesia','15.50-16.00','','AI Chatbots as Creative Writing Buddies: Stimulating Narrative Writing Skills in Primary School Students'],
  ],
  'ROOM 9': [
    ['Jiani Zhang','Sichuan Open University','China','13.30-13.40','Online','How to Enhance Adult Self-regulated Learning Behavior in a Blended Learning Environment'],
    ['Rifaul Annisa','Universitas Pendidikan Indonesia','Indonesia','13.40-13.50','','ENHANCING STUDENTS CRITICAL THINKING AND COGNITIVE SKILLS THROUGH VIRTUAL MEDIA INTEGRATION'],
    ['Melati','Universitas Jambi','Indonesia','13.50-14.00','','Google Docs for Teacher Professional Development: Engaging Students in Collaborative Learning'],
    ['Eny Cahyaningsih','Universitas Negeri Jakarta','Indonesia','14.00-14.10','','EVALUATING LEADERSHIP DEVELOPMENT IN BLENDED LEARNING ENVIRONMENTS'],
    ['Dyah Astriani','Universitas Negeri Surabaya','Indonesia','14.10-14.20','','Project-Based Blended Learning: Training Collaboration and Communication Skills of Mathematics Students'],
    ['Nurul Qomariyah Ahmad','Universitas Negeri Jakarta','Indonesia','14.20-14.30','','Method for Measuring Physical-Virtual Learning Environments for Deep Learning in Science Education'],
    ['Nadya Els Silmy','UIN Palopo','Indonesia','14.30-14.40','','Beyond the Screen: Hybrid Pedagogical Architecture for Cultivating Spiritual Intimacy in Islamic Higher Education'],
    ['Samsun','Universitas Negeri Jakarta','Indonesia','14.40-14.50','','Understanding Physics: The Influence of Cognitive Styles and Student Interest'],
    ['Harjoyo S.E., M.M.','Pamulang University','Indonesia','14.50-15.00','','The Effectiveness of Distance Learning and Blended Learning in Supporting Student Learning Flexibility'],
    ['Ibrahim Radwan Ramadan','Al Quds Open University','Palestina','15.00-15.10','','The Impact of Fluctuating Educational Modalities on Academic Achievement in Palestinian Universities'],
    ['Aulyanissa Tsaqifa Maharshall','Universitas Sultan Ageng Tirtayasa','Indonesia','15.10-15.20','','Enhancing Metacognitive and Reflective Thinking through Web-Based Mathematics Learning Media'],
    ['Fenno Farcis','Palangka Raya University','Indonesia','15.20-15.30','','THE EFFECTIVENESS OF BLENDED-PROJECT BASED LEARNING IN CONDUCTING SCIENTIFIC METHOD ANALYSIS'],
    ['Dian Permatasari Kusuma Dayu','Universitas Negeri Surabaya','Indonesia','15.30-15.40','','The Effect of Padlet-Based Blended Learning on Students Critical Thinking in German Writing Skills'],
    ['Daffa Fakhri Maulana','SMP Negeri 8 Yogyakarta','Indonesia','15.40-15.50','','REIMAGINING PANCASILA AND CIVIC EDUCATION THROUGH DISTANCE AND BLENDED LEARNING FOR DIGITAL CITIZENSHIP'],
    ['Adin Fauzi','Universitas Islam Balitar','Indonesia','15.50-16.00','','Pedagogical Alignment and Teacher Agency in An Indonesian Primary School English Program'],
    ['Diana Anggraini','Universitas Negeri Jakarta','Indonesia','16.00-16.10','','Research on Problem Based Learning in Primary School: a bibliometric analysis (2001-2026)'],
  ],
  'ROOM 10': [
    ['Andi Wapa','Universitas Pendidikan Ganesha','Indonesia','13.30-13.40','Online','Enhancing Multicultural Values Through Engghi Bunten-Based Collaborative Learning in Indonesian Elementary Schools'],
    ['Lalu Awaludin Akbar','IAIH Pancor Lombok Timur','Indonesia','13.40-13.50','','Ethnopedagogy Based Transformative Education to Develop Ecological Awareness and Social Resilience'],
    ['Dionisius Heckie Puspoko Jati','Satya Wacana Christian University','Indonesia','13.50-14.00','','Revitalization of the Nyadran Tradition in Building the Social and Spiritual Character of the Younger Generation'],
    ['Hasan, Firmansyah Dlis, Yasep Setiakarnawijaya','State University of Jakarta','Indonesia','14.00-14.10','','DEVELOPING AN ETHNOPEDAGOGICAL FITNESS TRAINING MODEL BASED ON TRADITIONAL MA RAGA SPORT'],
    ['Na Imatul Izza Amalia, Mega Puspitasari, M.Pd.','Universitas Trunodjoyo Madura','Indonesia','14.10-14.20','','ANALYSIS OF THE NEEDS FOR AN E-MODULE WITH THE THEME OF MARINE RESOURCES FOR WRITING NEGOTIATION TEXTS'],
    ['Aisyah Aizza Junda','Universitas Pelita Bangsa','Indonesia','14.20-14.30','','Analysis of Teachers Perspectives on the Habit of Dhuha Prayer on the Religious Character of Elementary School Students'],
    ['Deby Sekar Ayu','Universitas Pelita Bangsa','Indonesia','14.30-14.40','','Optimizing Visual Media in Islamic Religious Education Learning in Elementary Schools'],
    ['Luthfi Awwalia','Universitas Pembangunan Nasional Veteran Jawa Timur','Indonesia','14.40-14.50','','INTEGRATING LOCAL CULTURE IN PRIMARY ENGLISH TEXTBOOKS: A MULTIMODAL ETHNOPEDAGOGICAL ANALYSIS'],
    ['Shinta Oktafiana, Yuliyana Sintiya, Saifi Abdiyah','Universitas Islam Negeri Madura','Indonesia','14.50-15.00','','Measuring Critical Thinking Skills in Social Studies Education through Culturally Based Project Learning'],
    ['Mia Febriana','Universitas Sebelas Maret','Indonesia','15.00-15.10','','Teachers Voices on Students Literacy: A Sociocultural and Ethnopedagogical Narrative Study'],
    ['Nina Nurani Putri','Universitas Pelita Bangsa','Indonesia','15.10-15.20','','Analysis Of Teacher Perspectives On Dhuha Prayer Habituation In Shaping The Religious Character'],
    ['Diva Kartika Meilania, et al.','Universitas Pelita Bangsa','Indonesia','15.20-15.30','','ANALYSIS OF TEACHER PERCEPTIONS OF LEARNING STRATEGIES IN INCULCATING ENVIRONMENTAL CLEANLINESS VALUES'],
    ['Yuli Amaliyah','Universitas Bengkulu','Indonesia','15.30-15.40','','INTERNALIZATION OF LOCAL WISDOM VALUES IN BAREANG (REJANG KEPAHIANG REGIONAL CULTURE) LEARNING'],
    ['Dr. Irma Diani, M. Hum.','Universitas Bengkulu','Indonesia','15.40-15.50','','EFFORTS FOR NATURE CONSERVATION THROUGH ECOLOGICAL VALUES AND ECOLEXICON SYMBOLS IN SERAWAI ORAL LITERATURE'],
    ['Alda Wiharja, et al.','Universitas Pelita Bangsa','Indonesia','15.50-16.00','','ANALYSIS OF THE FINANCIAL LITERACY LEVELS OF ELEMENTARY SCHOOL STUDENTS IN BEKASI REGENCY'],
    ['Devi Irviani Wulandari','Universitas Pelita Bangsa','Indonesia','16.00-16.10','','Teachers Perceptions Of Tolerance Toward Diversity In Students Abilities And Learning Styles'],
  ],
  'ROOM 11': [
    ['Putri Kirana','Universitas Pelita Bangsa','Indonesia','13.30-13.40','Online','An Analysis Of Perceptions Regarding The Market Day Activity In Fostering An Early Spirit Of Entrepreneurship'],
    ['Siti Jamilah','Universitas Pelita Bangsa','Indonesia','13.40-13.50','','EDUPRENEURSHIP OF ELEMENTARY SCHOOL TEACHERS IN PROMOTING CREATIVE AND COMPETITIVE LEARNING INNOVATION'],
    ['Triyadi','Universitas Sebelas Maret','Indonesia','13.50-14.00','','A QUALITATIVE DESCRIPTIVE STUDY ON THE FACTORS OF TEACHER PERFORMANCE IN SURAKARTA'],
    ['Otto Trengginas Setiawan','National Research and Innovation Agency (BRIN)','Indonesia','14.00-14.10','','Language, Power, and Development: The Future of The Balik Language in The IKN Region'],
    ['Citra Cahyani','Universitas Pelita Bangsa','Indonesia','14.10-14.20','','TEACHERS PERSPECTIVE OF THE IMPACT OF MARKET DAY ACTIVITIES ON THE HONESTY ATTITUDES OF ELEMENTARY SCHOOL STUDENTS'],
    ['Dinda Qanita Nara','Universitas Pelita Bangsa','Indonesia','14.20-14.30','','THE IMPACT OF DHUHA PRAYER HABITUATION ON STUDENTS RELIGIOUS CHARACTER'],
    ['Andrisyah Andrisyah','IKIP Siliwangi','Indonesia','14.30-14.40','','Mathematical Playworld: An Imaginative Play-Based Approach to Developing Financial Literacy in Early Childhood'],
    ['Nur Amaliyah Hanum','Universitas Terbuka dan STAI Salafiyah Bangil','Indonesia','14.40-14.50','','Artificial Intelligence (AI) Supported Ethnopedagogy in Islamic Education: A Management Approach to Sustainable Learning'],
    ['Astrianingsih','Universitas Pelita Bangsa','Indonesia','14.50-15.00','','An Analysis of Teachers Perspectives on Market Day Activities in Supporting the Development of Entrepreneurial Spirit'],
    ['Cony Kapitalia','Universitas Pelita Bangsa','Indonesia','15.00-15.10','','SCHOOL CULTURE ANALYSIS IN AN EFFORT TO IMPROVE STUDENTS RELIGIOUS CHARACTER AT ELEMENTARY SCHOOL LEVEL'],
    ['Perawati Perawati','Universitas Riau','Indonesia','15.10-15.20','','Bajambau as a Pedagogical Resource: Integrating Kampar Local Wisdom into Technology Supported Character Education'],
    ['Dicky Cahya Nurfazri','Universitas Majalengka','Indonesia','15.20-15.30','','Buku Taun Tradition: Living Libraries and Digital Mediators in Intergenerational Transmission'],
    ['Nurul Isra Fauziah','Universitas Terbuka','Indonesia','15.30-15.40','','Teaching Presence in AI-Enhanced EFL Classes: A 2021-2026 Systematic Perspective'],
  ],
  'ROOM 12': [
    ['Fitriyani Fitriyani','STKIP Kusuma Negara','Indonesia','13.30-13.40','Online','Ethnopedagogy-Based Pancasila Learning Model for Social Tolerance in Elementary Schools'],
    ['Agung Wijaksono','Sekolah Tinggi Agama Islam Nurul Huda','Indonesia','13.40-13.50','','The Nexus of Ethnopedagogy and Character Building: A Case Study of Panca Jiwa at Pondok Modern Darussalam Gontor'],
    ['Alsadika Ziaul Haq','UIN Sunan Kalijaga','Indonesia','13.50-14.00','','The Wisdom of the Past for the Leadership of the Future: Leveraging Ethnopedagogical Values for Competitive Advantage'],
    ['Dr. Juanda, S.S., M.Pd. / Sintia Wati Dewi','Universitas Samawa / Universitas Terbuka','Indonesia','14.00-14.10','','UTILIZING VISUAL MEDIA TO ENHANCE INDONESIAN VOCABULARY ACQUISITION IN EARLY CHILDHOOD EDUCATION'],
    ['Puan Helwa Rezha Soraya','Universitas Pendidikan Indonesia','Indonesia','14.10-14.20','','The potential of Utilizing Students Local Environmental Context to Foster Their Plant Awareness Towards SDGs'],
    ['Muhamad Rosadi','National Research and Innovation Agency / BRIN','Indonesia','14.20-14.30','','Pantunin AI: An Artificial Intelligence-Driven Innovation for Local Wisdom Learning in the Digital Era'],
    ['Tanaya Salsabila','Universitas Pelita Bangsa','Indonesia','14.30-14.40','','Analysis of Teachers Difficulty Levels in Implementing Quranic Reading and Writing in Quranic Learning'],
    ['Serlita Nazwa Nilu','Universitas Pelita Bangsa','Indonesia','14.40-14.50','','ELEMENTARY SCHOOL TEACHERS PERCEPTIONS OF THE IMPLEMENTATION OF DEEP LEARNING IN THE LEARNING PROCESS'],
    ['Maulidatur Rizkiah','Universitas Pelita Bangsa','Indonesia','14.50-15.00','','ANALYSIS OF THE NEEDS FOR ELEMENTARY SCHOOL TEACHERS COMPETENCY DEVELOPMENT IN THE USE OF DIGITAL INTERACTIVE FLAT PANEL (IFP)'],
    ['Tiara Luthfi, S.Pd.','Universitas Terbuka','Indonesia','15.00-15.10','','MINDSET TRANSFORMATION AS A STRATEGY TO BUILD RESILIENCE AMIDST LEARNING CHALLENGES'],
    ['Astri Nuraeni S.Pd','Universitas Terbuka','Indonesia','15.10-15.20','','The Use of the Short Story Sang Petualang Pembawa Bencana to Enhance Environmental Care Character'],
    ['Annissa Shafira Rajani Rahman','Universitas Terbuka','Indonesia','15.20-15.30','','A Four-Session Structured Literacy Intervention to Strengthen Early Decoding'],
    ['Ernie Novriyanti Novriyanti','Universitas Negeri Jakarta','Indonesia','15.30-15.40','','EVALUATING ASSESSMENT QUALITY IN BIOLOGY EDUCATION USING THE RASCH MODEL'],
    ['Sarah Septiana Ningrum','UNIVERSITAS PELITA BANGSA','Indonesia','15.40-15.50','','THE IMPACT OF MARKET DAY ON ELEMENTARY SCHOOL STUDENTS ENTREPRENEURIAL VALUES'],
    ['Nida Elsa Salsabila','Universitas Pelita Bangsa','Indonesia','15.50-16.00','','Cultivating Entrepreneurial Spirit from an Early Age: An Analysis of Teachers Perspectives on Market Day Programs'],
    ['Nanda Maharani Sukma','Universitas PGRI Mpu Sindok','Indonesia','16.00-16.10','','Ethnopedagogy in the Digital Era: Strengthening Cultural Identity through Collaborative Digital Storytelling'],
  ],
  'ROOM 13': [
    ['Noviansyah Kusmahardhika, M.Pd','National Taiwan Normal University / Universitas Negeri Malang','Indonesia','13.30-13.40','','Integration of Augmented Reality into a Protist E-Module to Optimize Students Technological Literacy'],
    ['Nisrina Nurul Insani','Universitas Pendidikan Indonesia','Indonesia','13.40-13.50','Online','Validation of Deep Learning-Based Instructional Materials for Pancasila Education'],
    ['Mahfudz Reza Fahlevi','IAIN Syaikh Abdurrahman Siddik Bangka Belitung','Indonesia','13.50-14.00','','Number Talks as a Pedagogical Practice for Strengthening Mathematical Literacy and Student Wellbeing'],
    ['Guntur Prasetyo Utomo','Universitas Negeri Surabaya','Indonesia','14.00-14.10','','REDEFINING SCIENCE EDUCATION: THE RISE OF MESH-INTEGRATED ASSESSMENT'],
    ['Mohammad Sholikhin, Mega Puspitasari','Universitas Trunodjoyo Madura','Indonesia','14.10-14.20','','Feasibility of Digital Gamified Assessment Media for Eighth-Grade Students Speech Reading Skills'],
    ['Gemala Ranti','UNIVERSITAS NEGERI JAKARTA','Indonesia','14.20-14.30','','Needs Analysis for Developing Contextual Early Literacy Transition Learning Model in Indonesia'],
    ['Ahmad Nasir Ari Bowo','Universitas Cokroaminoto Yogyakarta','Indonesia','14.30-14.40','','PANCASILA INTEGRATED DIGITAL MODULAR INSTRUCTION TO ENHANCE SELF DIRECTED LEARNING IN EDUCATION'],
    ['Ajeng Tri Agustini','Universitas Pendidikan Indonesia','Indonesia','14.40-14.50','','Integrating Technology in 21st Century Learning: A Pedagogical Transformation for the Digital Generation'],
    ['Ikhwan Abduh','Universitas Negeri Jakarta','Indonesia','14.50-15.00','','Trends in Instructional Models for Teaching Artistic Gymnastics: A Systematic Literature Review'],
    ['Delilla Lizahra, S.Pd.','Universitas Terbuka','Indonesia','15.00-15.10','','DEEP LEARNING-ORIENTED LEARNING AND PROBLEM SOLVING IN PRIMARY EDUCATION: SCOPING REVIEW'],
    ['Muhammad Abdhi Assolah','Universitas Terbuka','Indonesia','15.10-15.20','','THE LANGUAGE REPERTOIRE PROFILE OF STUDENTS AT KHARISMA BANGSA ELEMENTARY SCHOOL'],
    ['Adnia Rianti Pradita','Universitas Terbuka','Indonesia','15.20-15.30','','Identifying Early Reading Challenges and Evaluating the Impact of Structured Phonological Intervention'],
    ['Muhamad Ikhsan, S.Pd.','Universitas Terbuka','Indonesia','15.30-15.40','','INTERNALIZING THE VALUES OF PANCASILA THROUGH HABITFORMING LEARNING IN ELEMENTARY SCHOOLS'],
    ['Leonard Raden Hutasoit, et al.','Universitas Terbuka','Indonesia','15.40-15.50','','Integration of MESH in Biology Learning: Analysis of Understanding and the Urgency of Implementation'],
  ],
  'ROOM 14': [
    ['Syifa Nur Shadrina','Universitas Pendidikan Indonesia','Indonesia','13.30-13.40','Online','Analysis of Students Product Creativity in STEM-ESD Project-Based Learning for SDG 12'],
    ['Aulia Urohmah','Universitas Sultan Ageng Tirtayasa (Untirta)','Indonesia','13.40-13.50','','Realistic Mathematics Education Model to Improve Mathematical Problem-Solving: A Systematic Review'],
    ['Ratu Asmaarobiyah','Sultan Ageng Tirtayasa University','Indonesia','13.50-14.00','','DESIGNING A PBL-RME-STEAM LEARNING FRAMEWORK FOR MATHEMATICAL PROBLEM-SOLVING SKILLS IN ELEMENTARY EDUCATION'],
    ['Yayang Karlina','Universitas Pendidikan Indonesia','Indonesia','14.00-14.10','','TRANSFORMING PRIMARY EDUCATION IN INDONESIA THROUGH TECHNOLOGY-DRIVEN PEDAGOGICAL INNOVATION'],
    ['Rini Solihat','UPI','Indonesia','14.10-14.20','','Analysing Teacher-Designed Learning Stimuli for Science Literacy: Implications for Critical Thinking and ESD-Oriented Pedagogy'],
    ['Siti Zahrotun','Sultan Ageng Tirtayasa University','Indonesia','14.20-14.30','','DESIGN OF A CONTEXTUAL INSTRUMENT FOR MEASURING MATHEMATICAL REASONING ABILITY IN SOCIAL ARITHMETIC'],
    ['Yuliyanti Yuliyanti','Universitas Sultan Ageng Tirtayasa','Indonesia','14.30-14.40','','A SYSTEMATIC LITERATURE REVIEW OF AUGMENTED REALITY (AR) AS A MATHEMATICS LEARNING MEDIA'],
    ['Puput Delia Indriani','Universitas Negeri Jakarta','Indonesia','14.40-14.50','','VALIDATING CREATIVE THINKING IN VOCATIONAL EDUCATION: A SECOND-ORDER CFA APPROACH'],
    ['Aam Amalia','Sultan Ageng Tirtayasa University','Indonesia','14.50-15.00','','The Effect of Project Base Learning with a STEAM Approach on Students Critical Thinking Skills and Self Regulated Learning'],
    ['Neza Agusdianita','University of Bengkulu','Indonesia','15.00-15.10','','EFFECTIVENESS OF STEM-INTEGRATED PROJECT-BASED LEARNING E-WORKSHEETS ON FIFTH-GRADE STUDENTS COGNITIVE ACHIEVEMENT'],
    ['Marzuki','Universitas Almuslim','Indonesia','15.10-15.20','','THE SELF CONCEPT OF ELEMENTARY SCHOOL STUDENTS IN LEARNING MATERIALS THROUGH 4C-BASED PROBLEM-BASED LEARNING'],
    ['Debi Heryanto','University of Bengkulu','Indonesia','15.20-15.30','','DEVELOPING STEAM-PBL BASED INTERACTIVE MULTIMEDIA WITH AUGMENTED REALITY FOR FLOOD MITIGATION'],
    ['Yusnia Yusnia','University of Bengkulu','Indonesia','15.30-15.40','','Needs Analysis of STEAM-Integrated Electronic Worksheets Based on Bengkulu Local Wisdom'],
    ['Wisnu Juli Wiono','University of Lampung','Indonesia','15.40-15.50','','E-BIOCARD TNBBS DALAM PROBLEM-BASED LEARNING TERHADAP KEMAMPUAN BERPIKIR KRITIS PESERTA DIDIK'],
    ['Heny Wijaya','Universitas Sultan Ageng Tirtayasa','Indonesia','15.50-16.00','','THE RELATIONSHIP BETWEEN LEARNING MOTIVATION AND COGNITIVE LOAD AND MATHEMATICAL PROBLEM-SOLVING SKILLS'],
    ['Syafira Defni','Universitas Pendidikan Indonesia','Indonesia','16.00-16.10','','Climate Literacy Profiles of Indonesian Secondary Students: Investigation of Knowledge, Attitudes, Efficacy'],
  ],
  'ROOM 15': [
    ['Vania Zulfa','Universitas Negeri Jakarta','Indonesia','13.30-13.40','Online','Enhancing Teacher Competency in Early Childhood Sexual Education: The Efficacy of the SE-BLOOM Model'],
    ['Vivi Khoerunnissa','Universitas Pelita Bangsa','Indonesia','13.40-13.50','','An Analysis of Elementary School Teachers Level of Understanding of The Academic Ability Test (TKA)'],
    ['Trias Wibiwirutami','Universitas Pelita Bangsa','Indonesia','13.50-14.00','','Teachers Understanding of the Project-Based Learning (PjBL) Model in Elementary Schools'],
    ['Dewi Laras Tuti','Universitas Pelita Bangsa','Indonesia','14.00-14.10','','ANALYSIS OF ELEMENTARY SCHOOL TEACHERS CONSTRAINTS IN IMPLEMENTING CLASSROOM LEARNING EVALUATION'],
    ['Luthfiah Aulia Nurul Akmal','Universitas Pelita Bangsa','Indonesia','14.10-14.20','','ANALYSIS OF TEACHERS PERCEPTION OF STUDENTS NUMERACY LITERACY ABILITY IN SOLVING MATHEMATICS STORY PROBLEMS'],
    ['Holifah','Universitas Pelita Bangsa','Indonesia','14.20-14.30','','ANALYSIS OF TEACHER PERCEPTION TOWARDS THE USE OF INTERACTIVE LEARNING VIDEOS AND ITS INFLUENCE ON STUDENT LEARNING OUTCOMES'],
    ['Natashia Margaretha Sihombing','Universitas Pelita Bangsa','Indonesia','14.30-14.40','','The Impact of Information and Communication Technology Barriers on Elementary School Students'],
    ['Heny Oktavia','Universitas Pelita Bangsa','Indonesia','14.40-14.50','','Readiness of Primary School Teachers in the era of Digital Transformation: Study of technology utilization for Learning Evaluation'],
    ['Shofy Hakimah','UNIVERSITAS TERBUKA','Indonesia','14.50-15.00','','INTERACTIVE MEDIA AND DIFFERENTIATED ASSESSMENT FOR ENHANCING GRADE 1 DATA LITERACY'],
    ['Laala Hilda Faujiyah / Siti Fadilah','Universitas Terbuka Serang','Indonesia','15.00-15.10','','DEVELOPMENT OF MULTIMODAL E-BOOK MEDIA IN LEARNING TO WRITING DESCRIPTIVE TEXTS IN ELEMENTARY SCHOOLS'],
    ['Dodi Lesmana, Mira Amelia Amri, Puryati','Universitas Negeri Jakarta','Indonesia','15.10-15.20','','Analisis Kemampuan Berpikir Geometris Siswa Sekolah Dasar di Kota Depok'],
    ['Yofran Hengki Ndoluanak, Muchlas Suseno, Ahmad Ridwan','Universitas Negeri Jakarta','Indonesia','15.20-15.30','','A Multi-Criteria Evaluation Model for Elite Police Recruitment: Integrating CIPP, CSE-UCLA, and Extended ELECTRE III'],
  ],
  'ROOM 16': [
    ['Yunisa Sapphira Titalia','Universitas Pendidikan Indonesia','Indonesia','13.30-13.40','Online','Deep Learning-Based STEM: A Time Series Experimental Study of Force Problem-Solving Skills'],
    ['Sheryl Mutiara Putri','Universitas Negeri Jakarta','Indonesia','13.40-13.50','','STUDENTS PERCEPTIONS OF STEAM LEARNING TO ENHANCE CRITICAL THINKING IN ELEMENTARY SCHOOLS'],
    ['Marito Evinoel Sambur','Universitas Negeri Medan (UNIMED)','Indonesia','13.50-14.00','','NEEDS ANALYSIS OF A GREEN CHEMISTRY-BASED VIRTUAL LABORATORY FOR CATION ANALYSIS INSTRUCTION'],
    ['Rida Anastasia Nasution, S.Pd, Gr','Universitas Negeri Medan','Indonesia','14.00-14.10','','NEED ANALYSIS FOR STEM-BASED PROJECT-BASED LEARNING TEACHING MATERIALS INTEGRATING MANDALING ETHNOSCIENCE'],
    ['Hanif Roihan Fikri','Universitas Sultan Ageng Tirtayasa','Indonesia','14.10-14.20','','The Effect of the Use of Learning Technologies on Students Mathematical Problem-Solving Skills'],
    ['Adinda Asri Ramadhanti','Universitas Bengkulu','Indonesia','14.20-14.30','','STEAM approach in elementary schools as a learning strategy'],
    ['Marwan Maulana, Novi Ramdhani, Luthpin Ubaidiah','Universitas Terbuka','Indonesia','14.30-14.40','','THE EFFICACY OF INTERACTIVE APPLICATION BASED MEDIA IN ENHANCING SPATIAL GEOMETRY'],
    ['Rena Nuralia','Universitas Sultan Ageng Tirtayasa','Indonesia','14.40-14.50','','A Systematic Literature Review of Augmented Reality in Mathematics Education'],
    ['An Nuril Maulida Fauziah','Universitas Negeri Surabaya','Indonesia','14.50-15.00','','INCLUSIVE TEACHING IN VIRTUAL MICROTEACHING FOR STEM EDUCATION'],
    ['Lena Amelia','Universitas Terbuka','Indonesia','15.00-15.10','','SYSTEMATIC LITERATURE REVIEW (SLR): ANALYSIS OF BULLYING BEHAVIOR AND PREVENTION STRATEGIES IN ELEMENTARY SCHOOLS'],
    ['Anggita Maritsha','Universitas Riau','Indonesia','15.10-15.20','','PROSPECTIVE SCHOOL COUNSELORS COMPETENCE THROUGH PROJECT-BASED LEARNING IN IDENTIFYING OPPORTUNITIES AND CHALLENGES OF INCLUSIVE JUNIOR HIGH SCHOOLS'],
    ['Reni Chintya Putri Sirait','Universitas Riau','Indonesia','15.20-15.30','','RELATIONSHIP BETWEEN DIGITAL FATIGUE AND ACADEMIC STRESS: ROLE OF COUNSELING SERVICES'],
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
    const targetRoom = body.room; // optional: update single room, else all

    const roomsToUpdate = targetRoom ? [targetRoom] : Object.keys(ROOM_HEADERS);
    const results = [];

    for (const room of roomsToUpdate) {
      const header = ROOM_HEADERS[room];
      const participants = ROOM_PARTICIPANTS[room] || [];

      if (!header) {
        results.push({ room, status: 'skipped', reason: 'no header data' });
        continue;
      }

      // Build value ranges for header (cells C3, C4, C5 = invitedSpeaker, moderator, IT)
      const valueRanges = [
        { range: `${room}!C3`, values: [[header.invitedSpeaker]] },
        { range: `${room}!C4`, values: [[header.moderator]] },
        { range: `${room}!C5`, values: [[header.it]] },
      ];

      // Add participant rows starting from row 9 (1-indexed)
      // Row 9 = invited speaker slot, participants start from row 10 (index 9 in 0-based)
      // Sheet layout: row 1=title, 2=room, 3=topic, 4=invited speaker header, 5=moderator header,
      // 6=IT header (new), 7=blank, 8=column headers, 9=invited speaker slot, 10+=participants
      participants.forEach((p, i) => {
        const rowNum = 10 + i; // row 10 = first participant
        valueRanges.push({
          range: `${room}!A${rowNum}:G${rowNum}`,
          values: [[i + 1, p[0], p[1], p[2], p[3], p[4], p[5]]]
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