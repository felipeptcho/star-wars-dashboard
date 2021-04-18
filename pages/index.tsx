import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import {
  Row, Col, Card, Descriptions, Input, Result, Typography, Rate,
} from 'antd';

import PEOPLE, { PeopleInterface, Person } from '@/api/schema/query/people';
import MainLayout from '@/components/layouts/MainLayout';

const getFavoriteList = () => {
  const list = window.localStorage.getItem('favoriteList');

  if (!list) {
    return [];
  }

  return JSON.parse(list);
};

const Home: React.FC = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery<PeopleInterface>(PEOPLE);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [favoriteList, setFavoriteList] = useState<string[]>([]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    setFavoriteList(getFavoriteList());
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const isFavorite = (person: Person) => favoriteList.includes(person.id);

  const handleStarClick = (person: Person) => () => {
    const list = getFavoriteList();

    if (list.includes(person.id)) {
      list.splice(list.indexOf(person.id), 1);
    } else {
      list.push(person.id);
    }

    localStorage.setItem('favoriteList', JSON.stringify(list));
    setFavoriteList(list);
  };

  const searchFilter = (person: Person) => {
    if (searchTerm) {
      return person.name && person.name.toLowerCase().includes(searchTerm.toLowerCase());
    }

    return true;
  };

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error :(</p>;

  const peopleList = data.allPeople?.filter(searchFilter) || [];

  return (
    <MainLayout>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Typography.Title>Star Wars</Typography.Title>
        </Col>
        <Col span={12} offset={12}>
          <Input.Search placeholder="Type to search..." allowClear onSearch={handleSearch} />
        </Col>
        {peopleList.length === 0 && (
          <Col span={24}>
            <Result
              status="info"
              title="No character found."
              subTitle="No character found."
            />
          </Col>
        )}
        {peopleList.length ? peopleList.map((person) => (
          <Col key={person.id} span={24} md={12} lg={8}>
            <Card cover={(<img alt="example" src={person.image} />)} className="h-full">
              <Rate count={1} className="mb-2" defaultValue={isFavorite(person) ? 1 : 0} onChange={handleStarClick(person)} />
              <Descriptions title={person.name} column={1}>
                <Descriptions.Item label="Species">{person.species?.name || '-'}</Descriptions.Item>
                <Descriptions.Item label="Starships">{person.starships?.map((s) => s.name).join(', ') || '-'}</Descriptions.Item>
                <Descriptions.Item label="Films">{person.films?.map((s) => s.title).join(', ') || '-'}</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        )) : null}
      </Row>
    </MainLayout>
  );
};

export default Home;
