import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import axios from 'axios';

const EpisodeList = () => {
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchEpisodes = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${pageNumber}`);
      setEpisodes(response.data.results);
    } catch (error) {
      console.error('Error fetching episodes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCharacters = async (episodeId) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`);
      setCharacters(response.data.characters);
      setFilteredCharacters(response.data.characters); // Karakterleri filtrelenmemiş olarak ayarla
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  useEffect(() => {
    fetchEpisodes(page);
  }, [page]);

  useEffect(() => {
    if (selectedEpisode) {
      fetchCharacters(selectedEpisode.id);
    }
  }, [selectedEpisode]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Karakterleri ara ve eşleşenleri filtrelenmiş karakter listesine ayarla
    const filteredChars = characters.filter(character =>
      character.name.toLowerCase().includes(text.toLowerCase()) ||
      character.species.toLowerCase().includes(text.toLowerCase()) ||
      character.type.toLowerCase().includes(text.toLowerCase()) ||
      character.gender.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCharacters(filteredChars);
  };

  const renderEpisodeItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedEpisode(item)}>
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text>{item.name}</Text>
        <Text>{item.air_date}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCharacterItem = ({ item }) => (
    <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text>{item.name}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Species: {item.species}</Text>
      <Text>Type: {item.type}</Text>
      <Text>Gender: {item.gender}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>Episodes</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, marginHorizontal: 10, marginBottom: 10 }}
          placeholder="Search characters..."
          onChangeText={handleSearch}
          value={searchQuery}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={episodes}
            renderItem={renderEpisodeItem}
            keyExtractor={(item) => item.id.toString()}
            style={{ width: '100%' }}
          />
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 }}>
          <TouchableOpacity onPress={handlePrevPage}>
            <Text style={{ fontSize: 18, color: page > 1 ? '#0000ff' : '#ccc' }}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextPage}>
            <Text style={{ fontSize: 18, color: '#0000ff' }}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      {selectedEpisode && (
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>Characters</Text>
          <FlatList
            data={filteredCharacters}
            renderItem={renderCharacterItem}
            keyExtractor={(item) => item.id}
            style={{ width: '100%' }}
          />
        </View>
      )}
    </View>
  );
};

export default EpisodeList;
