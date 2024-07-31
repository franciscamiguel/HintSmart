using Microsoft.EntityFrameworkCore;
using SmartHint.Models;

namespace SmartHint.DAL
{
    public class SmartHintContext : DbContext
    {
        public SmartHintContext() { }

        public DbSet<Client> Clients { get; set; }
        public DbSet<PersonType> PersonTypes { get; set; }
        public DbSet<Gender> Genders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Client>(client =>
                {
                    client
                        .HasOne(cl => cl.PersonType)
                        .WithOne(pt => pt.client)
                        .HasForeignKey<PersonType>(pt => pt.Id);

                    client
                        .HasOne(cl => cl.Gender)
                        .WithOne(g => g.Client)
                        .HasForeignKey<Gender>(pt => pt.Id);
                });
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder.UseMySQL("server=localhost;database=smarthint;user=root;password=H3rm3s!1031_");
        }
    }
}
