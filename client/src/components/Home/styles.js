//  import { makeStyles } from '@material-ui/core/styles';
// import { deepPurple } from '@material-ui/core/colors';

// export default makeStyles((theme) => ({
//   body: {
//     padding: '0 10%',
//     // margin:'100px'
//   },
//   appBar: {
//     borderRadius: 15,
//     margin: '30px 0',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: '10px 50px',
//     [theme.breakpoints.down('sm')]: {
//       flexDirection: 'column',
//     },
//   },
//   heading: {
//     color: theme.palette.primary.main,
//     textDecoration: 'none',
//     fontSize: '2em',
//     fontWeight: 300,
//   },
//   image: {
//     marginLeft: '10px',
//     marginTop: '5px',
//   },
//   [theme.breakpoints.down('sm')]:{
//     // breakpoint (offer via material-UI): similar to media-query
//     mainContainer:{
//       flexDirection: 'column-reverse',
//       alignItems:"center"
//     }
//   }
//   ,
//   toolbar: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     width: '400px',
//     [theme.breakpoints.down('sm')]: {
//       width: 'auto',
//     },
//   },
//   profile: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     width: '400px',
//     alignItems: 'center',
//     [theme.breakpoints.down('md')]: {
//       width: 'auto',
//       marginTop: 20,
//       justifyContent: 'center',
//     },
//   },
//   logout: {
//     marginLeft: '20px',
//   },
//   userName: {
//     display: 'flex',
//     alignItems: 'center',
//     textAlign: 'center',
//   },
//   brandContainer: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   purple: {
//     color: theme.palette.getContrastText(deepPurple[500]),
//     backgroundColor: deepPurple[500],
//   },
// }));

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));