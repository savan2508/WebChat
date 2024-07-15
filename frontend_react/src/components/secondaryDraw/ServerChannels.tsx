import {

	Box,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {MEDIA_URL} from "../../config.ts";
import {ServerD} from "../../@types/serverD.ts";
import {Link, useParams} from "react-router-dom";

interface ServerChannelProps {
	data: ServerD[];
}

export const ServerChannels = (props: ServerChannelProps) => {
	const {data} = props;
	const theme = useTheme();
	const {serverId} = useParams();
	const server_name = data?.[0]?.name ?? "Server"

	return (
		<>
			<Box
				sx={{
					height: 50,
					p: 2,
					display: "flex",
					alignItems: "center",
					px: 2,
					borderBottom: `1px solid ${theme.palette.divider}`,
					position: "sticky",
					top: 0,
					backgroundColor: theme.palette.background.default,
				}}
			>
				<Typography variant="body1" style={{textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>
					{server_name}
				</Typography>
			</Box>
			<List sx={{py: 0}}>
				{data?.flatMap((obj) =>
					obj.server_channel.map((server) => (
						<ListItem
							disablePadding
							key={server.id}
							sx={{display: "block"}}
							dense={true}
						>
							<Link
								to={`/server/${serverId}/${server.id}`}
								style={{textDecoration: "none", color: "inherit"}}
							>
								<ListItemButton sx={{minHeight: 48}}>
									<ListItemAvatar>
										<img
											alt="Server icon"
											src={`${MEDIA_URL}${server.icon}`}
											style={{
												width: 24,
												height: 24,
												display: "block",
												margin: "auto",
											}}
										/>
									</ListItemAvatar>
									<ListItemText
										primary={
											<Typography
												variant="body1"
												textAlign="start"
												paddingLeft={1}
												textTransform={"capitalize"}
											>
												{server.name}
											</Typography>
										}
									/>
								</ListItemButton>
							</Link>
						</ListItem>
					)))}
			</List>
		</>
	);
};
