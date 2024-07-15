import {Link, useParams} from "react-router-dom";
import useCrud from "../../hooks/useCrud.ts";
import {useEffect} from "react";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import {MEDIA_URL} from "../../config.ts";

interface Server {
    id: number;
    name: string;
    description: string;
    icon: string;
    banner: string;
    category: string;
}

export const ExploreServers = () => {
    const {categoryName} = useParams();
    const url = categoryName
        ? `/server/select/?category=${categoryName}`
        : "/server/select";
    const {dataCrud, fetchData} = useCrud<Server>([], url);

    useEffect(() => {
        fetchData();
    }, [categoryName]);

    return (
        <>
            <Container maxWidth="lg">
                <Box sx={{pt: 6}}>
                    <Typography
                        variant="h3"
                        noWrap
                        component="h1"
                        sx={{
                            display: {
                                sm: "block",
                                fontWeight: 700,
                                fontSize: "48px",
                                letterSpacing: "-2px",
                            },
                            textAlign: {xs: "center", sm: "left"},
                            textTransform: "capitalize",
                        }}
                    >
                        {categoryName ? categoryName : "Popular Channels"}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        noWrap
                        component="div"
                        sx={{
                            display: {sm: "block", fontWeight: 500, fontSize: "24px"},
                            textAlign: {xs: "center", sm: "left"},
                        }}
                    >
                        {categoryName
                            ? "Explore servers in this category"
                            : "Find the most popular servers"}
                    </Typography>
                </Box>

                {categoryName && (
                    <Box sx={{pt: 6}}>
                        <Typography
                            variant="h4"
                            noWrap
                            component="h2"
                            sx={{
                                display: {sm: "block", fontWeight: 700, fontSize: "36px"},
                                textAlign: {xs: "center", sm: "left"},
                            }}
                        >
                            Recommended Channels
                        </Typography>
                        <Grid container spacing={{xs: 0, sm: 2}}>
                            {dataCrud.map((server) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={server.id}>
                                    <Link
                                        to={`/server/${server.id}`}
                                        style={{textDecoration: "none", color: "inherit"}}
                                    >
                                        <Card
                                            sx={{
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                boxShadow: "none",
                                                backgroundImage: "none",
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                image={
                                                    server.banner
                                                        ? `${MEDIA_URL}${server.banner}`
                                                        : "https://picsum.photos/300/200"
                                                }
                                                alt="randon"
                                                sx={{display: {xs: "none", sm: "block"}}}
                                            />
                                            <CardContent
                                                sx={{
                                                    flexGrow: 1,
                                                    p: 0,
                                                    "&:last-child": {paddingBottom: 0},
                                                }}
                                            >
                                                <List>
                                                    <ListItem disablePadding>
                                                        <ListItemIcon sx={{minWidth: 0}}>
                                                            <ListItemAvatar sx={{minWidth: "50px"}}>
                                                                <Avatar
                                                                    alt="Server Icon"
                                                                    src={`${MEDIA_URL}${server.icon}`}
                                                                />
                                                            </ListItemAvatar>
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                <Typography
                                                                    variant="body2"
                                                                    textAlign="start"
                                                                    sx={{
                                                                        textOverflow: "ellipsis",
                                                                        fontWeight: 700,
                                                                        overflow: "hidden",
                                                                        whiteSpace: "nowrap",
                                                                    }}
                                                                >
                                                                    {server.name}
                                                                </Typography>
                                                            }
                                                            secondary={
                                                                <Typography variant="body2">
                                                                    {server.description}
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItem>
                                                </List>
                                            </CardContent>
                                        </Card>{" "}
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Container>
        </>
    );
};
