import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const CustomCard = styled(Card)`
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
  height: 100%;
  background: #fff;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
  }
`;


const IconWrapper = styled.div`
  font-size: 2.3rem;
  margin: auto;
  margin-bottom: 0.5rem;
  color: #002c42;
  transition: transform 0.2s ease, color 0.2s ease;

  ${CustomCard}:hover & {
    transform: scale(1.15);
    color: #004060;
  }
`;

const CardBody = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background: #fff;
`;

const CardTitle = styled(Card.Title)`
  text-align: center;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #002c42;
`;

const CardText = styled(Card.Text)`
  text-align: center;
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
  flex: 1;
`;

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12" style={{ background: '#f1f5f9' }}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Container>
                        <Row xs={1} md={2} lg={4} className="g-4">

                            <Col key={1}>
                                <CustomCard>
                                    <CardBody>
                                        <IconWrapper>
                                            <i class="bi bi-currency-exchange"></i>
                                        </IconWrapper>
                                        <CardTitle>Assets Management</CardTitle>
                                        <CardText>Manage and control all your client’s assets</CardText>

                                        <Link href='/assets' className="">
                                            <Button variant="outline-dark">
                                                Go Now
                                            </Button>
                                        </Link>
                                    </CardBody>
                                </CustomCard>
                            </Col>

                        </Row>
                    </Container>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
