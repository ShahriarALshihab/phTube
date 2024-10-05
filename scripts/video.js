//load catagory
const loadCategory = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/phero-tube/categories"
    );
    const data = await res.json();

    showCategory(data.categories);
  } catch (e) {
    console.error("Error fetching categories:", e);
  }
};

// display category btn

const showCategory = (categories) => {
  const categoryBtnContainer = document.getElementById("category-btn");

  categories.forEach((element) => {
    const categoryBtn = document.createElement("div");

    categoryBtn.innerHTML = ` 
        <button id="btn-${element.category_id}" onclick="specificCategoryVideos(${element.category_id})" class="btn category-btn">
        ${element.category}
        </button>
      `;

    categoryBtnContainer.appendChild(categoryBtn);
  });
};

//load Videos

const loadVideos = async (searchText='') => {
  try {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
    );
    const data = await res.json();
    showVideos(data.videos);
  } catch (e) {
    console.error(e);
  }
};

// show vidoes by specific category function
const specificCategoryVideos = async (id) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    );
    const data = await res.json();

    const activeBtn = document.getElementById(`btn-${id}`);

    //remove others btn active class
    removeBtnActiveClass();

    activeBtn.classList.add("active");

    showVideos(data.category);
  } catch (e) {
    console.error(e);
  }
};

// show video cards

const showVideos = (videos) => {
  const videoCardContainer = document.getElementById("videos-container");
  videoCardContainer.innerHTML = "";

  if (videos.length == 0) {
    videoCardContainer.classList.remove("grid");
    videoCardContainer.innerHTML = `
            <div class="flex items-center flex-col gap-5 justify-center ">
            <img class="" src="images/icon.png" />
            <p class="font-bold text-2xl text-center ">Oops!! Sorry, No content here! </p>
            </div>

            
            `;
    return;
  } else {
    videoCardContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    const upTime = uploadTime(video.others.posted_date);

    const videoCard = document.createElement("div");
    videoCard.classList = "card";
    videoCard.innerHTML = `  
             
      <figure class="h-[250px]  relative">
        <img class='h-full w-full object-cover'
          src="${video.thumbnail}"
          alt="" />
    
          ${
            video.others.posted_date
              ? `<span class="absolute text-xs bg-black text-white right-4 bottom-3 px-2 py-0 rounded-md"> ${upTime} </span> `
              : ""
          } ; 
      </figure>
    
          <div class=" flex gap-3 px-0 py-2 text-xs">
          
                <div>
                <img class="w-10 h-10 rounded-full object-cover " src="${
                  video.authors[0].profile_picture
                }" />
                </div>
    
                <div >
                    <h2 class="card-title">${video.title}</h2>
                    <div class="flex items-center gap-2">
                    <p class="text-gray-400">${
                      video.authors[0].profile_name
                    } </p>
    
                    ${
                      video.authors[0].verified
                        ? `<img class="w-5 object-cover" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" /> `
                        : ""
                    }
    
                    
                    </div>
    
                    <p class="text-gray-400"> ${video.others.views} views</p>
    
                    <div class=" flex items-center  justify-center">
                        <button onclick="loadVideoDetails('${
                          video.video_id
                        }')" class="btn btn-sm btn-error mt-6 ">Details</button>
                    </div>
                </div>
        
          </div>
    
    
    
            `;

    videoCardContainer.appendChild(videoCard);
  });
};

//Remove Category btn Active Class

const removeBtnActiveClass = () => {
  const btns = document.getElementsByClassName("category-btn");

  for (let btn of btns) {
    btn.classList.remove("active");
  }
};

// video details btn function

const loadVideoDetails = async (videoId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  );
  const data = await res.json();
  displayVideoDetails(data.video);
};

//display video details modal

const displayVideoDetails = (videoDetails) => {
  const detailContainer = document.getElementById("modal-content");

  detailContainer.innerHTML = `<p>
        ${videoDetails.description}
        </p>
        `;
  document.getElementById("showModalData").click();
};


document.getElementById("input-text").addEventListener("keyup", (e) => {
    loadVideos(e.target.value);
})

//call the functions
loadCategory();

loadVideos();

//👺👺👺👺👺👺👺👺👺👺👺👺👺👺
const cardDemo = {
  category_id: "1001",
  video_id: "aaal",
  thumbnail: "https://i.ibb.co/hdtZYbB/enchnting.jpg",
  title: "Enchanted Harmonies",
  authors: [
    {
      profile_picture: "https://i.ibb.co/jh1q2F3/shopia.jpg",
      profile_name: "Sophia Williams",
      verified: false,
    },
  ],
  others: {
    views: "7.6K",
    posted_date: "16450",
  },
  description:
    "'Enchanted Harmonies' by Sophia Williams enchants listeners with its delicate, soothing sounds and melodic complexity. Garnering 7.6K views, this piece is perfect for those seeking an immersive musical experience that blends elegance with emotion, offering a unique soundscape that resonates deeply with its audience.",
};
