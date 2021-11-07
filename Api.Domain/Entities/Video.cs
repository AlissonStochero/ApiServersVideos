using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Api.Domain.Entities
{
    public class Video
    {
        public Video()
        {
        }
        public Video(string description, int sizeInBytes, string videoInBytes, Guid serverid)
        {
            this.Description = description;
            this.SizeInBytes = sizeInBytes;
            this.VideoInBytes = videoInBytes;
            this.ServerId = serverid;
            this.InsertAt = DateTime.Now;
        }
        [Key]
        public Guid Id { get; private set; }
        public string Description { get; private set; }
        public int SizeInBytes { get; private set; }
        public string VideoInBytes { get; private set; }
        public DateTime InsertAt { get; private set; }
        [Required]
        public Guid ServerId { get; set; }
        public Server Server { get; set; }
    }
}
