---
title: "Three Levels of Programming With the Petoi 'Bittle X' Robot Dog"
excerpt: "Learn how to engage students in a journey through three levels of computer programming using the highly capable Petoi 'Bittle X' Robot Dog."
last_modified_at: 2026-08-13T20:14:57
toc: true
toc_sticky: true
toc_label: "On This Page"
toc_icon: "robot"
header:
  teaser: /assets/images/misc/three-levels-programming-background.jpeg
  og_image: /assets/images/misc/three-levels-programming-background.jpeg
  overlay_image: /assets/images/misc/three-levels-programming-background.jpeg
  overlay_filter: 0.6
categories:
  - blog
tags:
  - stem-education
---


<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script src="/assets/js/download-pdf.js"></script>

<style>
    .page__hero--overlay {
        background-position: center 60%;
    }
    /* Apply styles only on tablets and larger devices */
    @media (min-width: 768px) {
        .page__hero--overlay {
            padding: 10em 0;
        }
    }
</style>

**Update:** This workshop is now featured on Petoi's blog! Read more about it in the article: [New Bittle Robotics Curriculum & Microsoft Event Focusing on K12 STEM Education](https://www.petoi.com/blogs/blog/new-bittle-curriculum-microsoft-event).
{: .notice--info}

## Some Background

STEM education is an area of passion for me, one that I'm fortunate to be able to act on through volunteer programs sponsored by my [employer](https://en.wikipedia.org/wiki/Microsoft). As I started working with students, I quickly found that interactive activities are the best way to ensure they don't fall asleep, especially in our present TikTok generation and the [receding attention spans it's producing](https://jolt.richmond.edu/2024/03/06/tiktok-brain-can-we-save-childrens-attention-spans/). With the goal of being both informative and "cool", I set out to find tools that allow me to teach coding in a way that's fun. Not only for students into tech, but also for those still exploring and finding their passions.

Robots turned out to be a great way to do that, and after a brief stint with the impressive but unreliable [Tello Talent](https://www.dji.com/robomaster-tt) programmable flying drone, I've settled on something more grounded. Namely, a robot dog, built in the image of Boston Dynamics' famous [Spot](https://bostondynamics.com/products/spot/), but on a much smaller, and therefore approachable, scale. The [Petoi 'Bittle X' Robot Dog](https://www.petoi.com/products/petoi-robot-dog-bittle-x-voice-controlled) has become a mainstay of STEM workshops I've developed, which you can check out [here](https://github.com/segunak/stem-education/tree/master/petoi-bittle/workshops). Students from middle school through college love interacting with it, and I love Petoi's open source approach whereby educators can bring their own imagination to working with the dog.

Petoi provides a block-based coding interface for the dogs, called [Petoi Coding Blocks](https://www.petoi.com/pages/resources-curriculum-stem-coding-robot), but I quickly moved towards having students work in an environment emulating what we use as software engineers daily, namely IDEs like [Visual Studio Code](https://code.visualstudio.com/). However, the fact that Petoi allows users of their product to do their own thing with the robot, including using any IDE, adding new skills, uploading their own C++ code via [Arduino](https://www.arduino.cc/), and writing custom scripts in Python, shows their commitment to open-source software, which I give them a ton of respect and props for.

This post features a workshop I developed that takes students through three levels of computer programming, from low-level serial protocol, to high-level languages that most software engineers [use today](https://survey.stackoverflow.co/2024/technology/#1-programming-scripting-and-markup-languages), to the future with AI-assisted programming and prompt engineering. The goal is to show them that all three levels have their uses, and that the last level, where AI is involved, still requires a human being to build the code, tooling, and solutions that enable AI to do cool things. I've delivered it a handful of times, refining with each iteration, so much so that I now feel comfortable sharing it here on my blog.

## Workshop Overview

Here are the main goals of the workshop:

1. **Explore Three Levels of Programming**: Guide students through programming from low-level commands (Serial Protocol), to high-level languages (Python), and finally to AI-driven prompt engineering.

2. **Develop Hands-On Coding Skills**: Have students write code in Python to control the Petoi 'Bittle X' Robot Dog, learning the essentials of AI-assisted coding and natural language commands.

3. **Experience the Fusion of Hardware and Software**: Show how software programming translates into physical actions, giving students insight into how hardware and software integrate in robotics.

4. **Build an AI Perspective**: Help students understand the growing role of generative AI in programming and explore how prompt engineering allows high-level commands to control machines.

5. **Gain Practical Robotics Knowledge**: Teach foundational robotics concepts like serial communication, sensor integration, and autonomous movement, which are essential skills for any students interested in hardware-software interaction.

## Required Materials

Here's what's needed to run this workshop. For the code and configuration related pieces below, I've put a lot of stuff together in an easy to use format. See [workshop code](#workshop-code) for more details.

- **Petoi 'Bittle X' Robot Dog**: Ideally one per 5-6 students. These run about $300, sometimes a bit less. I can understand balking at the price, the ones I use came out of my employer's pockets rather than my own. All I can say is it's worth it. You can purchase one on Petoi's website [here](https://www.petoi.com/products/petoi-robot-dog-bittle-x-voice-controlled) or on Amazon [here](https://www.amazon.com/Petoi-Robot-Bittle-Pre-Assembled-Robotics/dp/B0C5S4YF13?th=1)

- **Laptops or Desktops**: One per 5-6 students. These will need to be set up with various software to interface with the robot dog. Follow Petoi's getting started guide found [here](https://docs.petoi.com/getting-started-guide).

- **Serial Protocol Documentation**: The serial protocol documentation for the robot dog can be found [here](https://docs.petoi.com/apis/serial-protocol). These can be printed or provided via a slide or QR code. A nicely formatted version of the commands can be found [here](https://github.com/segunak/stem-education/blob/master/petoi-bittle/documentation/serial-protocol.pdf).

- **Visual Studio Code (VS Code)**: The [Visual Studio Code](https://code.visualstudio.com/) IDE installed on the computers.

- **Python**: Installed on the computers. Follow Microsoft's documentation [here](https://code.visualstudio.com/docs/python/python-tutorial) on getting started with Python in VS Code. Follow Petoi's documentation [here](https://docs.petoi.com/apis/python-api) on getting set up with controlling their robot dogs via Python.

- **Python Packages**: The Python packages [openai](https://pypi.org/project/openai/), [python-dotenv](https://pypi.org/project/python-dotenv/), and [pyserial](https://pypi.org/project/pyserial/) installed via [pip](https://packaging.python.org/en/latest/tutorials/installing-packages/), which comes preinstalled with Python. You can install them all using the command `pip install openai python-dotenv pyserial` from a Windows Terminal.

- **Petoi Python Modules**: The `PetoiRobot`, `SerialCommunication`, and `ardSerial` modules from Petoi, found [here](https://github.com/PetoiCamp/Petoi_MindPlusLib/tree/main/python/libraries).

- **OpenAI API Key**: For the prompt engineering piece, an OpenAI API key listed in a `.ENV` file in the same directory as the code files for the workshop. You can get one [here](https://platform.openai.com/api-keys), after setting up an account with OpenAI. See the [workshop code](#workshop-code) section for more details.

- **Optional:** A projector for demonstrating concepts and results. I've created an accompanying PowerPoint for the workshop which you can find in the [facilitation resources](#facilitation-resources) section.

## Required Expertise

Here's what you need to know to facilitate this workshop. I'll say, you can wing a good part of this without all the necessary background knowledge, thanks to the resources available [here](#facilitation-resources). But ideally, a facilitator would have all of these.

- **Basic Understanding of Programming Concepts**: Familiarity with programming fundamentals, especially in Python.

- **Experience with Robotics**: Some experience with robotics and how hardware and software interact.

- **Familiarity with AI and Prompt Engineering**: Basic knowledge of AI, specifically generative AI and prompt engineering. If you want to get up to speed, check out my AI learning article found [here](https://segunakinyemi.com/blog/ai-learning-resources/).

- **Comfort with Setting Up Development Environments**: Ability to install and configure software like Python, VS Code, and necessary packages.

- **Ability to Guide Students Through Hands-On Activities**: Comfortable leading students through coding exercises and troubleshooting issues that may arise. Heavy on the troubleshooting part. Stuff will happen, you'll need to play it off, find an alternative, and keep pushing.

## Workshop Code

I've put together a folder on GitHub with the code, including all the aforementioned custom Petoi Python modules required to run this workshop. You can download this entire folder and copy it to whatever computer you're using for the workshop.

[GitHub Folder - Three Levels of Programming](https://github.com/segunak/stem-education/tree/master/petoi-bittle/workshops/Three%20Levels%20of%20Programming)

The `code` subfolder has three main files: [level-1.py](https://github.com/segunak/stem-education/blob/master/petoi-bittle/workshops/Three%20Levels%20of%20Programming/code/level-1.py), [level-2.py](https://github.com/segunak/stem-education/blob/master/petoi-bittle/workshops/Three%20Levels%20of%20Programming/code/level-2.py), and [level-3.py](https://github.com/segunak/stem-education/blob/master/petoi-bittle/workshops/Three%20Levels%20of%20Programming/code/level-3.py). Open the [code](https://github.com/segunak/stem-education/tree/master/petoi-bittle/workshops/Three%20Levels%20of%20Programming/code) folder in Visual Studio Code, and [run each file](https://code.visualstudio.com/docs/python/python-tutorial#:~:text=support%20for%20Linting.-,Run%20Python%20code,right%20side%20of%20the%20editor.&text=Select%20one%20or%20more%20lines,Selection%2FLine%20in%20Python%20Terminal.) to enter live activity mode for that level. Of course, for this to work, you'll need the software mentioned [above](#required-materials) installed, but once that's done, this folder should be enough to get you going, with one caveat.

For Level 3 (prompt engineering), you'll need to add your own `.ENV` file to the `code` folder and place an [OpenAI API key](https://platform.openai.com/docs/quickstart) in it. The file should have one line:

```
OPENAI_API_KEY=YOUR_API_KEY_HERE
```

After that, the workshop flow becomes: "Students, open the `level-[1, 2, 3].py` file and run it in Visual Studio Code". This, of course, is assuming you've connected the robot dog to the laptop/computer, either via Bluetooth (can be spotty) or the USB cable that comes with the dog (reliable).

## Troubleshooting

I've run into things here and there using the robot dogs and have kept a scratch pad of my findings. It's not exactly well organized, but I figured it may have some value to those who find themselves running into issues. Furthermore, Petoi has official frequently asked questions pages that are great for troubleshooting issues.

- [My Miscellaneous Petoi 'Bittle X' Robot Dog Notes](https://github.com/segunak/stem-education/blob/master/petoi-bittle/documentation/general-info.md)
- [Petoi - Product - Frequently Asked Questions](https://www.petoi.com/pages/faq)
- [Petoi - Technical - Frequently Asked Questions](https://docs.petoi.com/technical-support/faq-frequently-asked-questions)

## Facilitation Resources

A full facilitation guide for this workshop can be found below. The latest version will always be on GitHub [here](https://github.com/segunak/stem-education/blob/master/petoi-bittle/workshops/Three%20Levels%20of%20Programming/three-levels-of-programming.md).

<iframe
    src="https://segunak.github.io/stem-education/petoi-bittle/workshops/Three%20Levels%20of%20Programming/three-levels-of-programming.pdf"
    width="100%"
    height="500px"
    style="border: 1px solid gray">
</iframe>

---

Also, here's a presentation for use in delivering this workshop. If you download a copy, check the notes section, as it has guidance on key points to hit and concepts to share with students.

<iframe
  src="https://1drv.ms/p/c/750d396c5cadcebd/IQQ67fSnJoHfQ7oYwxikid2QAUTnKamyjaM4qThDrbKBKIU?em=2&amp;wdAr=1.7777777777777777"
  width="100%"
  height="500px"
  frameborder="0">
</iframe>
