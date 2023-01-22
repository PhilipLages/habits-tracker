import { Alert, ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import dayjs from 'dayjs';

import RouteParams from "../components/interfaces/routeParams";
import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { api } from "../lib/axios";
import DayInfoProps from "../components/interfaces/dayInfoProps";

export function Habit() {
  const [isLoading, setIsLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const route = useRoute();
  const { date } = route.params as RouteParams;
 
  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  const fetchHabits = async () => {
    try {
      setIsLoading(true);

      const response = await api.get('/day', { params: { date } });

      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits);  
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não foi possível carregar as informações dos hábitos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleHabit = async (habitId: string) => {
    if (completedHabits.includes(habitId)) {
      setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId));
    } else {
      setCompletedHabits(prevState => [...prevState, habitId]);
    }
  } ;

  useEffect(() => {
    fetchHabits();
  }, []);

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton/>

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          { dayOfWeek }
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          { dayAndMonth }
        </Text>

        <ProgressBar progress={20}/>

        <View className="mt-6">
          { dayInfo?.possibleHabits && 
            dayInfo?.possibleHabits.map(habit => (
              <Checkbox 
                key={ habit.id }
                title={ habit.title }
                checked={ completedHabits.includes(habit.id) }
                onPress={ () => handleToggleHabit(habit.id) }
              />
            ))             
          }
        </View>
      </ScrollView>
    </View>
  )
}
