export const projects = [
  {
    title: "Path Planning for Robotic Pick and Place",
    photo: "",
    shortDescription:
      "Master's thesis - end-to-end pick-and-place system with custom path planning and real-time object tracking on a moving conveyor belt.",
    what: {
      photo: "/images/projects/pick-and-place/what.jpg",
      text: "End-to-end robotic pick-and-place system focused on path and motion planning. The robot detects, tracks, and grasps everyday objects on a moving conveyor belt while accounting for obstacles in the workspace. Custom implementations were compared against MoveIt! to evaluate trade-offs in performance and flexibility.",
    },
    how: {
      photo: "/images/projects/pick-and-place/how.jpg",
      text: "Path planning using RRT, RRT*, PRM, and RRT-Connect. ROS-based control of a 7-DOF manipulator with TRAC-IK for goal sampling and quintic spline trajectories for smooth motion. Object detection via YOLO segmentation with an Intel RealSense depth camera, and an asynchronous Kalman filter for predictive tracking of moving targets.",
    },
    result: {
      photo: "/images/projects/pick-and-place/result.jpg",
      text: "Successfully executed pick-and-place in both static and dynamic environments. The full pipeline (planning, vision, and grasping) was built from scratch. The thesis earned the highest possible grade and now serves as the foundation for future research in the lab.",
    },
    links: [
      { label: "Final demo video", url: "https://www.youtube.com/watch?v=pIJOYhk0q8E" },
      { label: "Link to the thesis", url: "https://drive.google.com/file/d/1zg2PzGN8ueNV1A8n--UdR76iDoGKFvZ0/view?usp=sharing" },
    ],
  },
  {
    title: "2D Path Planning Sandbox",
    photo: "",
    coverCrop: false,
    shortDescription:
      "Interactive tool for implementing and benchmarking motion planning algorithms in 2D, built as a companion to the M.Sc. thesis.",
    what: {
      photo: "/images/projects/path-planning-sandbox/what.png",
      text: "A sandbox tool for implementing and experimenting with widely used motion planning algorithms in 2D. Built as a practical aid for the thesis and partly just to play around - a way to explore planning methods in a simpler space before scaling up to a 7-DOF robot.",
    },
    how: {
      photo: "/images/projects/path-planning-sandbox/how.png",
      text: "Developed in Python with a PyQt5 GUI. Modular architecture allows easy integration of custom planners and maps. Includes built-in analytics for automated benchmark runs across different maps and parameter configurations.",
    },
    result: {
      photo: "/images/projects/path-planning-sandbox/result.png",
      text: "Used successfully to prototype and validate planning concepts before testing on hardware. The transition from 2D to 7-DOF algorithms turned out to be smoother than expected. The tool is currently being developed into an online application.",
    },
    links: [
      { label: "GitHub", url: "https://github.com/mkleszcz11/motion_planning_visualiser" },
    ],
  },
  {
    title: "NNE/DTU RoboTech Challenge",
    photo: "",
    shortDescription:
      "A 2-week industry challenge to build an autonomous sorting and inspection robot for a pharmaceutical production line - 3rd place finish.",
    what: {
      photo: "/images/projects/robotech-challenge/what.png",
      text: "A 2-week challenge organised by Novo Nordisk Engineering and the Technical University of Denmark. The task was to set up a robot for autonomous sorting and inspection of cartridges in tubs, in conditions representative of a real pharmaceutical production environment.",
    },
    how: {
      photo: "/images/projects/robotech-challenge/how.png",
      text: "Used a UR3e collaborative robot for the sorting tasks, a SICK code reader and inspection camera for quality control, and a Siemens Simatic S7-1500 PLC as the main controller.",
    },
    result: {
      photo: "/images/projects/robotech-challenge/result.png",
      text: "Finished 3rd place with the \"Kernel Panic\" team. Gained hands-on experience with Universal Robots, SICK vision systems, and Siemens PLCs - and had a genuinely good time working alongside industry professionals.",
    },
  },
  {
    title: "Autonomous Trolley",
    photo: "",
    shortDescription:
      "Bachelor's thesis - a mobile robot prototype that follows a specific person using computer vision, built as a proof-of-concept smart shopping cart.",
    what: {
      photo: "/images/projects/autonomous-trolley/what.png",
      text: "Bachelor's thesis project. The goal was to design and build a prototype mobile robot that autonomously follows a designated person - a concept for a smart shopping cart that moves with you through a store.",
    },
    how: {
      photo: "/images/projects/autonomous-trolley/how.jpeg",
      text: "Person recognition via image analysis using OpenCV and the COCO dataset, implemented in Python. Component selection was driven by the project's functional requirements, balancing capability with practicality.",
    },
    result: {
      photo: "/images/projects/autonomous-trolley/result.jpeg",
      text: "A fully functional prototype that passed all verification tests against the defined requirements. Awarded the highest possible thesis grade.",
    },
    links: [
      { label: "Video showing robot in action", url: "https://drive.google.com/file/d/1E_wr30p72p-L5uhkT-PUuX_sMUO5VApr/view?usp=drive_link" },
    ],
  },
  {
    title: "Electric Skateboard",
    photo: "",
    shortDescription:
      "Custom-built electric mountainboard with a hand-made battery pack - 52 km/h top speed, 22 km range.",
    what: {
      photo: "/images/projects/electric-skateboard/what.png",
      text: "A personal project to build a vehicle that makes getting around the city faster. The idea was to find something other than an electric scooter - luckily I had an old mountainboard collecting dust in storage.",
    },
    how: {
      photo: "/images/projects/electric-skateboard/how.png",
      text: "Designed in Autodesk Inventor with components chosen for their price-to-quality ratio. Custom battery pack assembled from Li-ion cells, with spot-welded connections. Fabrication used 3D printing and CNC laser cutting for structural and enclosure parts.",
    },
    result: {
      photo: "/images/projects/electric-skateboard/result.jpeg",
      text: "Does exactly what it was built for - cuts my commute to university to about a third of the time on foot. Top speed: 52 km/h. Range: 22 km.",
    },
    links: [
      { label: "Full project description", url: "https://electric-skateboard.builders/t/first-build-giving-my-old-mountainboard-a-second-life-custom-motor-mounts-3d-printed-wheel-pulleys-flipsky-dual-fsesc-6-6-dual-6374-190kv-10s5p-under-1000/116329" },
    ],
  },
  {
    title: "Tolerance Tracing and Compensation",
    photo: "",
    shortDescription:
      "Robotic Summer School final project - detecting and compensating manufacturing tolerance chains that disrupt robotic screwing operations, proposed by Danfoss.",
    what: {
      photo: "/images/projects/tolerance-tracing/what.png",
      text: "Final project for the Robotics Summer School at SDU, proposed by Danfoss Drives. The problem: misalignments caused by tolerance chains in manufacturing that cause robotic screwing operations to fail. The goal was to detect and compensate for these deviations automatically.",
    },
    how: {
      photo: "/images/projects/tolerance-tracing/how.png",
      text: "Two approaches were implemented and compared: classical computer vision and a Convolutional Neural Network (CNN). Both were tested and validated in a simulation environment that we also developed ourselves.",
    },
    result: {
      photo: "/images/projects/tolerance-tracing/result.jpg",
      text: "The presentation was well received by the Danfoss team and sparked a genuine discussion about applicability in production. A rare chance to work directly with industry specialists on a current, real-world factory challenge.",
    },
    links: [
      { label: "Detailed case description", url: "https://drive.google.com/file/d/17VOub7TUd3BYyBCMSyg1lwVAp_vk4YwQ/view?usp=sharing" },
      { label: "Robotic Summer School webpage", url: "https://robotelite.sdu.dk/" },
    ],
  },
  {
    title: "Desktop Robotic Arm",
    photo: "",
    shortDescription:
      "5-axis manipulator built from scratch - fully 3D-printed, Arduino-controlled, with forward and inverse kinematics.",
    what: {
      photo: "/images/projects/desktop-arm/what.png",
      text: "A personal project to build a 5-axis desktop manipulator from scratch. The main motivation was hands-on learning of forward and inverse kinematics.",
    },
    how: {
      photo: "/images/projects/desktop-arm/how.png",
      text: "Designed in Autodesk Fusion 360. All structural parts are 3D-printed. Control runs on Arduino with servo motors at each joint.",
    },
    result: {
      photo: "/images/projects/desktop-arm/result.jpeg",
      text: "An operational manipulator capable of picking and placing lightweight objects. Can be controlled from a computer or via joysticks. I built it in my first year, so for that time I consider it a full success.",
    },
  },
  {
    isOther: true,
    title: "Other Projects",
    photo: "",
    shortDescription:
      "Not all of these are still relevant - but worth keeping as a log.",
  },
]

// Projects shown in the expandable "Other Projects" tile.
// For images, place files in public/images/projects/other/<slug>/
// and list them in the images array - they cycle automatically every 4 s.
// Drop images into public/images/projects/other/<imageDir>/ - they are picked up automatically.
export const otherProjects = [
  {
    title: "Smart Greenhouse",
    imageDir: "/images/projects/other/smart-greenhouse",
    description:
      "IoT course project focused on implementing and optimizing communication protocols for a smart greenhouse. BLE handles internal sensor data, LoRa covers external transmission, and everything is processed in Azure IoT for remote monitoring and control. It was so much fun that it's the only course-related project I included in this portfolio.",
    links: [
      { label: "Project report", url: "https://drive.google.com/file/d/1GQE79vgBlQFWXuh-hFQk1QS3q1_ar6Km/view?usp=sharing" },
    ],
  },
  {
    title: "Sound Mapping Robot",
    imageDir: "/images/projects/other/sound-mapping-robot",
    description:
      "Built at the Bitehack hackathon in Cracow. The robot follows a set path, measures sound intensity at specific points, and plots the data as a noise pollution map - the concept was inspired by the way air pollution maps work. Chassis is 3D printed, with motors and microphones controlled by a Raspberry Pi.",
  },
  {
    title: "Smart Plug",
    imageDir: "/images/projects/other/smart-plug",
    description:
      "Built at the BHL hackathon at Warsaw University of Technology. The device monitors real-time power consumption, lets you switch appliances on and off remotely, and cuts power automatically if no movement is detected for a set period. Arduino and ESP32 communicate over Wi-Fi, with data sent to a ThingSpeak web server.",
  },
  {
    title: "Autonomous Donkey",
    imageDir: "/images/projects/other/autonomous-donkey",
    description:
      "Built as part of the KN Integra student research group at AGH University of Science and Technology. A modular autonomous platform designed to be extended with different functional modules that attach on top of the base vehicle.",
  },
  {
    title: "Model to Robocomp 2021 Simulation",
    imageDir: "/images/projects/other/robocomp-2021",
    description:
      "A micromouse robot concept made for the KN Integra student research group at AGH. The model was designed specifically for the virtual competition environment built for Robocomp 2021.",
  },
  {
    title: "Module Hive for Mason Bees",
    imageDir: "/images/projects/other/mason-bee-hive",
    description:
      "This one is here mostly out of sentiment. My first 3D-printed design - a modular hive for mason bees where the whole structure disassembles easily, cutting the time needed to harvest the cocoons significantly compared to a drilled log or bundle of straws. My mum still uses and likes it, so it's probably the most future-proof project on this list.",
  },
]
