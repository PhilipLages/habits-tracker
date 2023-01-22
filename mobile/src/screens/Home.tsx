import { useCallback, useState } from "react";
import { Text, View, ScrollView, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import dayjs from "dayjs";

import Loading from "../components/Loading";
import { daySize, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";

import { weekDays } from "../utils/weekDays";
import { amountOfDaysToFill, datesFromYearBeginning } from "../utils/datesUtils";
import { api } from "../lib/axios";
import { SummaryTypes } from "../components/interfaces/summaryType";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryTypes | null>(null);

  const { navigate } = useNavigation();

  const fetchData = async () => {
    try {
      setIsLoading(true);      
      const response= await api.get('/summary');      
      setSummary(response.data);
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos.');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchData();
  }, []));

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <Header />

      <View className="flex-row mt-6 mb-2">
        { weekDays.map((weekDay, index) => (
          <Text 
            key={`${weekDay}-${index}`}
            className='text-zinc-400 text-xl font-bold text-center mx-1'
            style={{ width: daySize }}
          >
            { weekDay }
          </Text>
        )) }
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {
          summary &&
          <View className="flex-row flex-wrap">
            { datesFromYearBeginning.map(date => {
                const dayWithHabits = summary.find(day => {
                  return dayjs(date).isSame(day.date, 'day');
                })

                return (
                  <HabitDay
                    key={ date.toISOString() }
                    date={ date }
                    amountOfHabits={ dayWithHabits?.amount }
                    amountCompleted={ dayWithHabits?.completed }
                    onPress={ () => navigate('habit', { date: date.toISOString() }) }
                  />
                )
              })
            }

            { amountOfDaysToFill > 0 && Array
                .from({ length: amountOfDaysToFill })
                .map((_, index) => (
                  <View 
                  key={ index }
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                  style={{ width: daySize, height: daySize }}
                  />
                )) 
            }
          </View>
        }
      </ScrollView>
    </View>
  )
};