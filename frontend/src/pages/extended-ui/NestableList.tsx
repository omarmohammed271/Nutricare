import { SetStateAction, useState } from "react";
import { Avatar, Card, CardContent, CardHeader, Grid, IconButton, Typography, styled } from "@mui/material";
import { ItemInterface, ReactSortable, Sortable, Store } from "react-sortablejs";
import { LuMove } from "react-icons/lu";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { ColoredCard } from "@src/pages/base-ui/Cards";
import { useLayoutContext } from "@src/states";

import avatar5 from "@src/assets/images/avatars/avatar5.png";
import avatar6 from "@src/assets/images/avatars/avatar6.png";
import avatar7 from "@src/assets/images/avatars/avatar7.png";
import avatar8 from "@src/assets/images/avatars/avatar8.png";
import avatar9 from "@src/assets/images/avatars/avatar9.png";
import avatar10 from "@src/assets/images/avatars/avatar10.png";

type ReactSortableProps = {
  list: ItemType[];
  setList: (value: (newState: ItemType[], sortable: Sortable | null, store: Store) => void) => void;
};

type TeamMemberType = {
  id: number;
  name: string;
  avatar: string;
  position: string;
  desc?: string;
};
type ItemType = {
  id: number;
  color: string;
  class?: string;
};

function getNestableItems(count: number) {
  return Array(count)
    .fill({ id: 0 })
    .map((item, idx) => item.id + idx + 1);
}

const team1Data: TeamMemberType[] = [
  {
    id: 1,
    name: "Louis K. Bond",
    avatar: avatar5,
    position: "Founder & CEO",
    desc: "Disrupt pork belly poutine, asymmetrical tousled succulents selfies. You probably haven't heard of them tattooed master cleanse live-edge keffiyeh.",
  },
  {
    id: 2,
    name: "Dennis N. Cloutier",
    avatar: avatar6,
    position: "Software Engineer",
    desc: "Disrupt pork belly poutine, asymmetrical tousled succulents selfies. You probably haven't heard of them tattooed master cleanse live-edge keffiyeh.",
  },
  {
    id: 3,
    name: "Susan J. Sander",
    avatar: avatar7,
    position: "Web Designer",
    desc: "Disrupt pork belly poutine, asymmetrical tousled succulents selfies. You probably haven't heard of them tattooed master cleanse live-edge keffiyeh.",
  },
];

const team2Data: TeamMemberType[] = [
  {
    id: 1,
    name: "James M. Short",
    avatar: avatar8,
    position: "Web Developer",
    desc: "Disrupt pork belly poutine, asymmetrical tousled succulents selfies. You probably haven't heard of them tattooed master cleanse live-edge keffiyeh.",
  },
  {
    id: 2,
    name: "Gabriel J. Snyder",
    avatar: avatar9,
    position: "Business Analyst",
    desc: "Disrupt pork belly poutine, asymmetrical tousled succulents selfies. You probably haven't heard of them tattooed master cleanse live-edge keffiyeh.",
  },
  {
    id: 3,
    name: "Louie C. Mason",
    avatar: avatar10,
    position: "Human Resources",
    desc: "Disrupt pork belly poutine, asymmetrical tousled succulents selfies. You probably haven't heard of them tattooed master cleanse live-edge keffiyeh.",
  },
];

const ReactSortableContainer = styled(ReactSortable<ItemType>)<ReactSortableProps>(({ theme }) => {
  return {
    display: "grid",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "640px",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "auto auto",
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "auto auto auto",
    },
    gap: 22,
  };
});

const MovableCard1 = ({ member }: { member: TeamMemberType }) => {
  return (
    <Card>
      <CardHeader avatar={<Avatar src={member.avatar} />} title={member.name} subheader={member.position}></CardHeader>
      <CardContent>
        <Typography variant="body2">{member.desc}</Typography>
      </CardContent>
    </Card>
  );
};

const MovableCard2 = ({ member }: { member: TeamMemberType }) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        avatar={<Avatar src={member.avatar} />}
        title={member.name}
        subheader={member.position}
        action={
          <IconButton aria-label="settings">
            <LuMove className="r-sortable-handle" />
          </IconButton>
        }></CardHeader>
    </Card>
  );
};

const SimpleListCard = ({ number, disabled }: { number: number; disabled?: boolean }) => {
  const { themeMode } = useLayoutContext();

  return (
    <Card
      sx={{
        border: 1,
        borderWidth: 1,
        borderColor: themeMode == "light" ? "#e5e7eb" : "#4b5563",
        cursor: disabled ? "not-allowed" : "pointer",
        bgcolor: disabled ? "#f15776" : "",
      }}
      className={disabled ? "static-item" : ""}>
      <CardHeader
        subheader={`Item ${number}`}
        sx={{ py: "12px" }}
        subheaderTypographyProps={{ color: disabled ? "#fefefe" : "" }}
      />
    </Card>
  );
};

const SimpleDragNDrop = () => {
  const [items, setItems] = useState<ItemType[]>([
    {
      id: 1,
      color: "#6c757d",
    },
    {
      id: 2,
      color: "#5eb5ff",
    },
    {
      id: 3,
      color: "#26c362",
    },
    {
      id: 4,
      color: "#3e60d5",
    },
    {
      id: 5,
      color: "#fdb906",
    },
    {
      id: 6,
      color: "#f15776",
    },
  ]);

  return (
    <ComponentContainerCard title="Simple DragNDrop" description="Dragging and Dropping Colored Cards">
      <ReactSortableContainer list={items} setList={(e: any) => setItems(e)}>
        {items.map((item, idx) => (
          <ColoredCard bgColor={item.color} key={idx} style={{ cursor: "grabbing" }} />
        ))}
      </ReactSortableContainer>
    </ComponentContainerCard>
  );
};

const MoveBetweenDifferentContainers = () => {
  const { themeMode } = useLayoutContext();

  const [team1, setTeam1] = useState<TeamMemberType[]>(team1Data);

  const [team2, setTeam2] = useState<TeamMemberType[]>(team2Data);

  return (
    <ComponentContainerCard
      title="Move Between Different Containers"
      description="Dragging and Dropping Colored Cards"
      stackProps={{ display: "grid", gridTemplateColumns: "auto auto" }}>
      <ComponentContainerCard
        title="Container 1"
        sx={{ backgroundColor: themeMode == "light" ? "#f2f2f7" : "#2d333c" }}>
        <ReactSortable
          group="teamList"
          list={team1}
          setList={setTeam1}
          style={{ gap: 22, display: "flex", flexDirection: "column" }}>
          {team1.map((member, idx) => (
            <MovableCard1 member={member} key={idx} />
          ))}
        </ReactSortable>
      </ComponentContainerCard>
      <ComponentContainerCard
        title="Container 2"
        sx={{ backgroundColor: themeMode == "light" ? "#f2f2f7" : "#2d333c" }}>
        <ReactSortable
          group="teamList"
          list={team2}
          setList={setTeam2}
          style={{ gap: 22, display: "flex", flexDirection: "column" }}>
          {team2.map((member, idx) => (
            <MovableCard1 member={member} key={idx} />
          ))}
        </ReactSortable>
      </ComponentContainerCard>
    </ComponentContainerCard>
  );
};

const MoveStuffWithHandle = () => {
  const { themeMode } = useLayoutContext();

  const [team1, setTeam1] = useState<TeamMemberType[]>(team1Data);

  const [team2, setTeam2] = useState<TeamMemberType[]>(team2Data);

  return (
    <ComponentContainerCard
      title="Move stuff between containers using handle"
      stackProps={{ display: "grid", gridTemplateColumns: "auto auto", width: "100%" }}>
      <ComponentContainerCard
        title="Container 1"
        sx={{ backgroundColor: themeMode == "light" ? "#f2f2f7" : "#2d333c" }}>
        <ReactSortable
          group="teamList2"
          handle=".r-sortable-handle"
          list={team1}
          setList={setTeam1}
          style={{ gap: 22, display: "flex", flexDirection: "column", width: "100%" }}>
          {team1.map((member, idx) => (
            <MovableCard2 member={member} key={idx} />
          ))}
        </ReactSortable>
      </ComponentContainerCard>
      <ComponentContainerCard
        title="Container 2"
        sx={{ backgroundColor: themeMode == "light" ? "#f2f2f7" : "#2d333c" }}>
        <ReactSortable
          group="teamList2"
          handle=".r-sortable-handle"
          list={team2}
          setList={setTeam2}
          style={{ gap: 22, display: "flex", flexDirection: "column", width: "100%" }}>
          {team2.map((member, idx) => (
            <MovableCard2 member={member} key={idx} />
          ))}
        </ReactSortable>
      </ComponentContainerCard>
    </ComponentContainerCard>
  );
};

const SimpleList = () => {
  const [items, setItems] = useState(() => getNestableItems(6));

  return (
    <ComponentContainerCard title="Simple List" stackProps={{ width: "100%" }}>
      <ReactSortable
        easing="ease"
        list={items}
        setList={setItems}
        style={{ width: "100%", gap: 12, display: "flex", flexDirection: "column" }}>
        {items.map((item, idx) => (
          <SimpleListCard key={idx} number={item} />
        ))}
      </ReactSortable>
    </ComponentContainerCard>
  );
};

const ClosingList = () => {
  const [items1, setItems1] = useState(() => getNestableItems(6));

  const [items2, setItems2] = useState(() => getNestableItems(6));
  return (
    <ComponentContainerCard
      title="Closing"
      stackProps={{ display: "grid", gridTemplateColumns: "auto auto", width: "100%" }}>
      <ReactSortable
        list={items1}
        setList={setItems1}
        group={{
          name: "cloneingList",
          pull: "clone",
          put: false,
        }}
        sort={false}
        style={{ gap: 12, display: "flex", flexDirection: "column" }}>
        {items1.map((item, idx) => (
          <SimpleListCard key={idx} number={item} />
        ))}
      </ReactSortable>
      <ReactSortable
        group={{
          name: "cloneingList",
          pull: "clone",
          put: true,
        }}
        list={items2}
        setList={setItems2}
        sort={true}
        style={{ gap: 12, display: "flex", flexDirection: "column" }}>
        {items2.map((item, idx) => (
          <SimpleListCard key={idx} number={item} />
        ))}
      </ReactSortable>
    </ComponentContainerCard>
  );
};

const DisabledSortingList = () => {
  const [items1, setItems1] = useState(() => getNestableItems(6));

  const [items2, setItems2] = useState(() => getNestableItems(6));
  return (
    <ComponentContainerCard
      title="Disabled Sorting"
      stackProps={{ display: "grid", gridTemplateColumns: "auto auto", width: "100%" }}>
      <ReactSortable
        group="disabledSortingList"
        list={items1}
        setList={setItems1}
        easing="ease"
        style={{ gap: 12, display: "flex", flexDirection: "column" }}
        disabled>
        {items1.map((item, idx) => (
          <SimpleListCard key={idx} number={item} />
        ))}
      </ReactSortable>
      <ReactSortable
        group="disabledSortingList"
        list={items2}
        setList={setItems2}
        easing="ease"
        style={{ gap: 12, display: "flex", flexDirection: "column" }}
        disabled={false}>
        {items2.map((item, idx) => (
          <SimpleListCard key={idx} number={item} />
        ))}
      </ReactSortable>
    </ComponentContainerCard>
  );
};

const FilteredList = () => {
  const [items, setItems] = useState(() => getNestableItems(6));

  return (
    <ComponentContainerCard title="Filter" stackProps={{ width: "100%" }}>
      <ReactSortable
        easing="ease"
        filter={".static-item"}
        list={items}
        setList={setItems}
        style={{ width: "100%", gap: 12, display: "flex", flexDirection: "column" }}>
        {items.map((item, idx) => (
          <SimpleListCard key={idx} number={item} disabled={item == 2 ? true : false} />
        ))}
      </ReactSortable>
    </ComponentContainerCard>
  );
};

const NestableList = () => {
  return (
    <>
      <PageBreadcrumb title="Nestable List" subName="Extended UI" />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SimpleDragNDrop />
        </Grid>

        <Grid item xs={12}>
          <MoveBetweenDifferentContainers />
        </Grid>

        <Grid item xs={12}>
          <MoveStuffWithHandle />
        </Grid>

        <Grid item xs={12}>
          <SimpleList />
        </Grid>

        <Grid item xs={12}>
          <ClosingList />
        </Grid>

        <Grid item xs={12}>
          <DisabledSortingList />
        </Grid>

        <Grid item xs={12}>
          <FilteredList />
        </Grid>
      </Grid>
    </>
  );
};

export default NestableList;
