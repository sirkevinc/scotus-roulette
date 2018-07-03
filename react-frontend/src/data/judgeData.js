
const Judges = {
  CurrentJustices: [
    {
      name: "John Roberts",
      position: "Chief Justice",
      date_dob: "1955-01-27",
      id: 2738, 
      party: "r",
      picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Official_roberts_CJ.jpg/220px-Official_roberts_CJ.jpg"      
    },
    {
      name: "Clarence Thomas",
      position: "Associate Justice",
      date_dob: "1948-06-23",
      id: 3200, 
      party: "r",
      picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Clarence_Thomas_official_SCOTUS_portrait.jpg/220px-Clarence_Thomas_official_SCOTUS_portrait.jpg"      
    },
    {
      name: "Ruth Bader Ginsburg",
      position: "Associate Justice",
      date_dob: "1933-01-01",
      id: 1213,
      party: "d",
      picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Ruth_Bader_Ginsburg_2016_portrait.jpg/220px-Ruth_Bader_Ginsburg_2016_portrait.jpg"
    },
    {
      name: "Stephen Breyer",
      position: "Associate Justice",
      date_dob: "1938-01-01",
      id: 384,
      party: "d",
      picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Stephen_Breyer%2C_SCOTUS_photo_portrait.jpg/220px-Stephen_Breyer%2C_SCOTUS_photo_portrait.jpg"
    },
    {
      name: "Samuel Anthony Alito Jr.",
      position: "Associate Justice",
      date_dob: "1950-01-01",
      id: 77,
      party: "r",
      picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Samuel_Alito_official_photo.jpg/220px-Samuel_Alito_official_photo.jpg"      
    },
    {
      name: "Sonia Maria Sotomayor",
      position: "Associate Justice",
      date_dob: "1954-01-01",
      id: 3045,
      party: "d",
      picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Sonia_Sotomayor_in_SCOTUS_robe.jpg/1920px-Sonia_Sotomayor_in_SCOTUS_robe.jpg"
    },
    {
      name: "Elena Kagan",
      position: "Associate Justice",
      date_dob: "1960-04-28",
      id: 1691,
      party: "d",
      picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Elena_Kagan_Official_SCOTUS_Portrait_%282013%29.jpg/1280px-Elena_Kagan_Official_SCOTUS_Portrait_%282013%29.jpg"
    },
    {
      name: "Neil McGill Gorsuch",
      position: "Associate Justice",
      date_dob: "1967-08-29",
      id: 1250,
      party: "r",
      picture: "https://upload.wikimedia.org/wikipedia/commons/9/97/Associate_Justice_Neil_Gorsuch_Official_Portrait.jpg"
    },
  ],
  DemJudges: [
    {
      name: "Srikanth Srinivasan",
      id: 3065,
      picture: "https://upload.wikimedia.org/wikipedia/commons/2/27/Sri_Srinavasan.jpg",
      party: 'd'
    },
    {
      name: "Paul Jeffrey Watford",
      id: 3385,
      picture: "https://s.hdnux.com/photos/07/00/01/1835088/5/920x920.jpg",
      party: 'd'
    },
    {
      name: "Patricia Ann Millett",
      id: 2263,
      picture: "https://api.ballotpedia.org/v3/thumbnail/200/300/crop/best/Patricia_Ann_Millett_photo_2016.jpg",
      party: 'd'
    },
    {
      name: "Merrick B. Garland",
      id: 1155,
      picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Merrick_Garland.jpg/220px-Merrick_Garland.jpg",
      party: 'd'
    },
    {
      name: "Robert Leon Wilkins",
      id: 3473,
      picture: "https://img.huffingtonpost.com/asset/58b4803e29000028000c37a3.jpg",
      party: 'd'
    },
    {
      name: "Jane Louise Kelly",
      id: 1738,
      picture: "https://www.afj.org/wp-content/uploads/2013/09/Jane-Kelly-e1457014832978.jpg",
      party: 'd'
    },
    {
      name: "Jacqueline Nguyen",
      id: 2403,
      picture: "http://2.bp.blogspot.com/-nFG5YdeAG_M/TnvVuSm3EVI/AAAAAAAAFXM/GdUjbFCQ5lo/s800/jacquelinenguyen.jpg",
      party: 'd'
    },
  ],
  RepJudges: [
    {
      name: "Brett Kavanaugh",
      id: 1713,
      picture: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Judge_Brett_Kavanaugh.jpg",
      party: 'r'
    },
    {
      name: "Raymond Gruender",
      id: 1299,
      picture: "http://www.scotusblog.com/wp-content/uploads/2017/01/JudgeGruender2.jpg",
      party: 'r'
    },
    {
      name: "Thomas Hardiman",
      id: 1363,
      picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/JudgeThomasHardiman.pdf/page1-958px-JudgeThomasHardiman.pdf.jpg",
      party: 'r'
    },
    {
      name: "Raymond Kethledge",
      id: 1765,
      picture: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Judge_Raymond_Kethledge.png",
      party: 'r'
    },
    {
      name: "William H. Pryor Jr.",
      id: 2636,
      picture: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Portrait_of_US_federal_judge_William_H._Pryor%2C_Jr.jpg",
      party: 'r'
    },
    {
      name: "Amul Thapar",
      id: 3195,
      picture: "https://upload.wikimedia.org/wikipedia/commons/7/79/Amul_Thapar.jpg",
      party: 'r'
    },
    {
      name: "Don R. Willett",
      id: 5846,
      picture: "http://mediad.publicbroadcasting.net/p/kstx/files/styles/x_large/public/201605/Willett3.jpg",
      party: 'r'
    },
    {
      name: "Steven M. Colloton",
      id: 686,
      picture: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Judge_Steven_Colloton_2016.jpg",
      party: 'r'
    }
  ],
  Removed: [
    {
      name: "Anthony Kennedy",
      position: "Associate Justice",
      date_dob: "1936-01-01",
      id: 1747,
      party: "r",
      picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Anthony_Kennedy_official_SCOTUS_portrait.jpg/220px-Anthony_Kennedy_official_SCOTUS_portrait.jpg"      
    },
  ]
};

export default Judges;