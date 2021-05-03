#!/bin/bash

DIR=/root/agendamento_telegram_zoho

JAR=$1
GECKO_DRIVER=$2
LINK=$3
PATH=$4
FILENAME=$5
EXTENSION=$6
CHAT_ID=$7

echo "Gerando foto dash"
java -jar $JAR $GECKO_DRIVER $LINK $PATH $FILENAME $EXTENSION

echo "Enviando sendPhoto $LINK"
curl -s -X POST "https://api.telegram.org/bot172969762:AAGebZk00AB4nG6_6XGK4dsm_fWDT3348Qc/sendPhoto" -F chat_id=$CHAT_ID -F photo="@$FILE"