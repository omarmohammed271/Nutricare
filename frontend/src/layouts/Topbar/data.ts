import avatar2 from "@src/assets/images/avatars/avatar2.png";
import avatar4 from "@src/assets/images/avatars/avatar4.png";

import githubIcon from "@src/assets/images/brands/github.png";
import bitbucketIcon from "@src/assets/images/brands/bitbucket.png";
import dropboxIcon from "@src/assets/images/brands/dropbox.png";
import slackIcon from "@src/assets/images/brands/slack.png";
import dribbbleIcon from "@src/assets/images/brands/dribbble.png";
import behanceIcon from "@src/assets/images/brands/behance.png";

import { IconType } from "react-icons";
import { LuMessageSquare, LuMessagesSquare, LuUserPlus } from "react-icons/lu";

export type NotificationItem = {
  id: number;
  text: string;
  subText: string;
  icon?: IconType;
  avatar?: string;
  bgColor?: string;
  createdAt: Date;
};

type AppsData = {
  name: string;
  icon: string;
  redirectTo: string;
};

/**
 * Get the apps
 */
const apps: AppsData[] = [
  {
    name: "GitHub",
    icon: githubIcon,
    redirectTo: "",
  },
  {
    name: "Bitbucket",
    icon: bitbucketIcon,
    redirectTo: "",
  },
  {
    name: "Dropbox",
    icon: dropboxIcon,
    redirectTo: "",
  },
  {
    name: "Slack",
    icon: slackIcon,
    redirectTo: "",
  },
  {
    name: "Dribbble",
    icon: dribbbleIcon,
    redirectTo: "",
  },
  {
    name: "Behance",
    icon: behanceIcon,
    redirectTo: "",
  },
];

const notifications: NotificationItem[] = [
  {
    id: 1,
    text: "Datacorp",
    subText: "Caleb Flakelar commented on Admin",
    icon: LuMessageSquare,
    createdAt: subtractHours(new Date(), 1),
  },
  {
    id: 2,
    text: "Admin",
    subText: "New user registered",
    icon: LuUserPlus,
    createdAt: subtractHours(new Date(), 60),
  },
  {
    id: 3,
    text: "Cristina Pride",
    subText: "Hi, How are you? What about our next meeting",
    avatar: avatar2,
    createdAt: subtractHours(new Date(), 1440),
  },
  {
    id: 4,
    text: "Datacorp",
    subText: "Caleb Flakelar commented on Admin",
    icon: LuMessagesSquare,
    createdAt: subtractHours(new Date(), 2880),
  },
  {
    id: 5,
    text: "Karen Robinson",
    subText: "Wow ! this admin looks good and awesome design",
    avatar: avatar4,
    createdAt: subtractHours(new Date(), 2880),
  },
];

/**
 * for subtraction minutes
 */
function subtractHours(date: Date, minutes: number) {
  date.setMinutes(date.getMinutes() - minutes);
  return date;
}

export { notifications, apps };
