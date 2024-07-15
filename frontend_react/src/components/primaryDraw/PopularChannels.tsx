import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import React, {useEffect} from "react";
import useCrud from "../../hooks/useCrud.ts";
import {MEDIA_URL} from "../../config.ts";
import {Link} from "react-router-dom";

interface Server {
    id: number;
    name: string;
    category: string;
    icon: string;
}

type Props = {
    open: boolean;
};

export const PopularChannels: React.FC<Props> = ({open}) => {
    const {dataCrud, fetchData, error, isLoading} = useCrud<Server>(
        [],
        "/server/select/",
    );

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
    }, [dataCrud]);

    return (
        <>
            <Box
                sx={{
                    height: 50,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    flex: "1 1 100",
                }}
            >
                <Typography sx={{display: open ? "block" : "none"}}>
                    Popular
                </Typography>
            </Box>
            <List>
                {dataCrud.map((server) => (
                    <ListItem
                        key={server.id}
                        sx={{display: "block"}}
                        dense={true}
                        disablePadding
                    >
                        <Link
                            to={`/server/${server.id}`}
                            style={{textDecoration: "none", color: "inherit"}}
                        >
                            <ListItemButton sx={{minHeight: 0}}>
                                <ListItemIcon sx={{minWidth: 0, justifyContent: "center"}}>
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
                                            sx={{
                                                fontWeight: 700,
                                                lineHeight: 1.2,
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {server.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 500,
                                                lineHeight: 1.2,
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {server.category}
                                        </Typography>
                                    }
                                    sx={{opacity: open ? 1 : 0}}
                                    primaryTypographyProps={{
                                        sx: {
                                            textOverflow: "ellipsis",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                        },
                                    }}
                                />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </>
    );
};
