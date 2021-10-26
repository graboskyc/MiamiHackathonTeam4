#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/runtime:5.0-buster-slim AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["Generator/Generator.csproj", "Generator/"]
RUN dotnet restore "Generator/Generator.csproj"
COPY . .
WORKDIR "/src/Generator"
RUN dotnet build "Generator.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Generator.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT dotnet Generator.dll "$BROKER" "$DEVICEID" "$TOPIC" "$SIZE" "$NAME"