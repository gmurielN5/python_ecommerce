import { Container, Grid, Typography } from '@mui/material';

export const Footer: React.FC = () => (
  <footer>
    <Container>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            style={{ padding: '1rem 0' }}
          >
            Copyright &copy; Elem
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </footer>
);
