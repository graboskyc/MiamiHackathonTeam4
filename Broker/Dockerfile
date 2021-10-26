#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/runtime:5.0-buster-slim AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["Broker/Broker.csproj", "Broker/"]
RUN dotnet restore "Broker/Broker.csproj"
COPY . .
WORKDIR "/src/Broker"
RUN dotnet build "Broker.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Broker.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT dotnet Broker.dll "$REALMAPPID" "$APIKEY"