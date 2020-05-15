import React, { ChangeEvent, MouseEvent, FC } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const drawerWidth = 170

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    newFile: {
      margin: theme.spacing(1),
    },
    createButton: {
      width: drawerWidth,
      padding: theme.spacing(1),
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  })
)

type Porps = {
  handleNewFile: (e: ChangeEvent<HTMLTextAreaElement>) => void
  newFile: string
  files: { [key: string]: string }
  _handleOpenPath: (path: string) => void
  createFile: () => void | undefined
}

const SideNav: FC<Porps> = ({
  handleNewFile,
  newFile,
  files,
  _handleOpenPath,
  createFile,
}) => {
  const classes = useStyles()

  const error = !newFile.endsWith('.py') && !newFile.endsWith('.cpp')

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {Object.keys(files).map((text, index) => (
            <ListItem button key={text} onClick={() => _handleOpenPath(text)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <TextField
            className={classes.newFile}
            error={error}
            id="standard-error"
            label="Create New"
            value={newFile}
            onChange={handleNewFile}
          />
          <Button
            className={classes.createButton}
            onClick={(e) => createFile()}
            color="primary"
            disabled={newFile.trim().length === 0 || error}
          >
            New
          </Button>
        </List>
      </Drawer>
    </div>
  )
}

export default SideNav
